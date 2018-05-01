import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import { shuffle } from 'lodash';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import getMyCourses from '../../api/courses';
import Styles from '../Styles/period';
import BoxItem from '../../components/boxItem';
import Loading from '../../components/loading';

const colors = shuffle(['#00509e', '#8bc34a', '#4caf50', '#03a9f4', '#009688', '#f44336', '#e91e63', '#ff5722', '#ff9800']);

class PeriodPage extends React.Component {
	state = {
		courses: [],
		fetching: true,
	}

	componentDidMount() {
		getMyCourses(this.props.user.ced.toString())
			.then((courses) => {
				this.setState({ courses, fetching: false });
			});
	}
	render() {
		const { classes, history } = this.props;
		const { courses, fetching } = this.state;
		if (!fetching)
			return (
				<Grid
					container
					direction="row"
					spacing={40}
					className={classes.container}
				>
					<Grid item xs={10} className={classes.title}>
						<Typography variant="display3">Materias cursando</Typography>
					</Grid>
					{courses.map((course, index) => (
						<Grid key={index} item xs={11} sm={6} md={4} lg={3}>
							<BoxItem
								onClick={() => history.push({ pathname: '/course', state: { ...course } })}
								label={course.subject_name}
								color={colors[index]}
							/>
						</Grid>
					))}
				</Grid>
			);
		return <Loading />;
	}
}

PeriodPage.propTypes = {
	classes: PropTypes.object.isRequired,
	user: PropTypes.object,
	history: PropTypes.object,
};


export default withStyles(Styles)(PeriodPage);
