import React from 'react';
import { groupBy, flatten } from 'lodash';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import { Doughnut, Line } from 'react-chartjs-2';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Styles from '../Styles/scores';
import ScoresPerPeriod from '../../components/scoresPerPeriod';
import getScores from '../../api/scores';
import Loading from '../../components/loading';

const dataDoughnut = {
	labels: ['Aprobadas', 'Reprobadas'],
	datasets: [{
		backgroundColor: ['#5bf45c', '#ff4949'],
	}],
};
const dataLine = {
	datasets: [{
		fill: false,
		lineTension: 0.1,
		backgroundColor: 'rgba(75,192,192,0.4)',
		borderColor: '#00509e',
		borderCapStyle: 'butt',
		borderDash: [],
		borderDashOffset: 0.0,
		borderJoinStyle: 'miter',
		pointBorderColor: '#00509e',
		pointBackgroundColor: '#fff',
		pointBorderWidth: 1,
		pointHoverRadius: 5,
		pointHoverBackgroundColor: '#00509e',
		pointHoverBorderColor: 'rgba(220,220,220,1)',
		pointHoverBorderWidth: 2,
		pointRadius: 1,
		pointHitRadius: 10,
	}],
};

const options = {
	responsive: true,
	legend: {
		display: false,
	},
};

const linearOptions = Object.assign({}, options, {
	scales: {
		yAxes: [{
			display: true,
			ticks: {
				min: 0,
				max: 20,
			},
		}],
	},
});
class ScoresPage extends React.Component {
	state = {
		scores: [],
		approved: 0,
		reproved: 0,
		prom: '0',
		honor: 0,
		better: '',
		fetching: true,
	};

	componentDidMount() {
		getScores().then(({ grades }) => {
			let approved = 0;
			let reproved = 0;
			const scores = Object.keys(grades).sort().map((grade) => {
				const courses = grades[grade].map((e) =>
					({
						name: e.sub_des,
						subject: e.subject,
						score: !/(I|SI|APL|NaN|i|DIF|AP)/.test(e.grade) ? parseInt(e.grade) : e.grade,
					})
				);
				const coursesWithScore = courses.filter((e) => !/(I|SI|APL|NaN|i|DIF|AP)/gi.test(e.score));
				const prom = (coursesWithScore.reduce((prev, current) => prev + current.score, 0) / coursesWithScore.length).toFixed(2);
				approved += coursesWithScore.filter((e) => e.score >= 10).length;
				reproved += coursesWithScore.filter((e) => e.score < 10).length;
				return {
					period: grade,
					courses,
					prom,
				};
			});
			const trimWithScores = scores.filter((e) => !isNaN(e.prom));
			dataLine.labels = trimWithScores.map((e) => e.period);
			dataLine.datasets[0].data = trimWithScores.map((e) => parseFloat(e.prom));
			const honor = trimWithScores.filter((e) => parseFloat(e.prom) >= 17).length;
			const better = trimWithScores.sort((a, b) => parseFloat(b.prom) - parseFloat(a.prom))[0].period;
			const allCourses = flatten(scores.map((period) =>
				period.courses.map((course) => course)
			));
			const courses = groupBy(allCourses, 'name');
			const everyBetterCourse = Object.values(courses).map((e) =>
				e.sort((a, b) => b.score - a.score)[0]
			);
			const coursesWithScores = everyBetterCourse.filter((e) => !/(I|SI|APL|NaN|i|DIF|AP)/gi.test(e.score));
			const prom = Object.values(coursesWithScores).reduce((prev, current) => prev + current.score, 0);
			dataDoughnut.datasets[0].data = [approved, reproved];
			this.setState({
				prom: prom ? (prom / coursesWithScores.length).toFixed(1) : '0',
				honor,
				scores,
				approved,
				reproved,
				better,
				fetching: false,
			});
		})
		.catch((err) => {
			console.log(err);
			this.props.history.push('/home');
		});
	}
	render() {
		const { classes } = this.props;
		const {
			scores,
			approved,
			reproved,
			prom,
			honor,
			better,
			fetching,
		} = this.state;
		if (!fetching)
			return (
				<div className={classes.root} >
					<Grid
						container
						justify="center"
						direction="row"
						spacing={40}
					>
						<Grid item xs={10} className={classes.title}>
							<Typography variant="display3">Estadisticas</Typography>
						</Grid>
						<Grid item xs={11} sm={11} md={8} lg={6}>
						</Grid>
					</Grid>
					<Grid
						container
						justify="center"
						direction="row"
						spacing={40}
					>
						<Grid item xs={11} sm={4} md={3} >
							<ScoresPerPeriod scores={scores} />
						</Grid>
						<Grid item xs={11} sm={7} md={7}>
							<Paper className={classes.grid}>
								<Grid
									container
									direction="row"
									justify="center"
								>
									<Grid item xs={11} sm={11} md={4} >
										<Typography className={classes.label} variant="display1" gutterBottom >Materias</Typography>
										<Doughnut data={dataDoughnut} options={options} />
									</Grid>
									<Grid item xs={11} sm={5} md={4} >
										<block>
											<Typography variant="display3" className={classes.value}>{better}</Typography>
											<Typography variant="headline" className={classes.betterPeriod}>Mejor trimestre</Typography>
										</block>
										<block className={classes.blockHonor}>
											<Typography variant="display3" className={classes.value}>{scores.length}</Typography>
											<Typography variant="headline" className={classes.honorLabel}>Trimestres cursados</Typography>
										</block>
										<block className={classes.blockHonor}>
											<Typography variant="display3" className={classes.value}>{approved + reproved}</Typography>
											<Typography variant="headline" className={classes.honorLabel}>Materias vistas</Typography>
										</block>
									</Grid>
									<Grid item xs={11} sm={5} md={4} >
										<block>
											<Typography variant="display3" className={classes.value}>{prom}pts</Typography>
											<Typography variant="headline" className={classes.betterPeriod}>Promedio general</Typography>
										</block>
										{honor > 0 && (
											<block className={classes.blockHonor}>
												<Typography variant="display3" className={classes.value}>{honor}</Typography>
												<Typography variant="headline" className={classes.honorLabel}>Cuadro de honor</Typography>
											</block>
										)}

									</Grid>
									<Grid item xs={11}>
										<Typography className={classes.label} variant="display1" gutterBottom >Calificaciones por trimestre</Typography>
										<Line data={dataLine} options={linearOptions} />
									</Grid>
								</Grid>
							</Paper>
						</Grid>
					</Grid>
				</div>
			);
		return <Loading />;
	}
}
ScoresPage.propTypes = {
	classes: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
};

const wStyle = withStyles(Styles)(ScoresPage);

export default wStyle;
