/* eslint-disable react/no-array-index-key */

import React from 'react';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Stepper, { Step, StepLabel } from 'material-ui/Stepper';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';
import SelectedCourses from '../../components/selectedCourses';
import { scheduleMaker } from '../../utils/scheduleMaker';
import SemestersList from '../../components/semestersList';
import Styles from '../Styles/tools';

class ToolsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

	state = {
		courses: [],
		pensum: [],
		fetching: false,
		combinations: [],
		activeStep: null,
		notifications: [],
	}
	componentWillMount() {
		this.setState({ fetching: true });
		fetch(`http://guru.vnz.la/API/pensum?cookie=${this.props.user.cookie}`)
			.then((response) => response.json())
			.then((data) => {
				const pensum = Object.keys(data).map((sem) => data[sem]);
				this.setState({ pensum, fetching: false, activeStep: 0 });
			});
	}

	getCoursesSections = (courses) => {
		this.setState({ activeStep: 2 });
		if (courses.length === 0)
			this.setState({ combinations: [] });
		else {
			this.setState({ fetching: true });
			const subjects = courses.map((course) => course.code);
			fetch('http://guru.vnz.la/API/schedules', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ subjects, cookie: this.props.user.cookie }),
			})
			.then((response) => response.json())
			.then((data) => {
				console.log('Success');
				scheduleMaker(data.schedules, (r) => {
					const { schedules, notifications } = r;
					this.setState({ fetching: false, combinations: schedules, notifications, activeStep: 3 });
				});
			});
		}
	}

	addCourse = (course) => {
		const { courses } = this.state;
		let coursesToState = Object.assign({}, courses);
		if (courses.filter((c) => c.code === course.code).length === 0)
			coursesToState = courses.concat(course);
		else
			coursesToState = courses.filter((c) => c.code !== course.code);
		this.setState({ courses: coursesToState, activeStep: 1 });
	};

	removeCourse = (index) => {
		const { courses } = this.state;
		const coursesToState = courses.slice().filter((_, i) => i !== index);
		this.setState({ courses: coursesToState, activeStep: 2 });
	};

	render() {
		const { pensum, fetching, courses, combinations, activeStep } = this.state;
		console.log(combinations);
		const { classes } = this.props;
		return (
      <div className={classes.root} >
				<Grid
					container
					justify="center"
					direction="row"
					spacing={40}
				>
          <Grid item xs={11} sm={11} md={8} lg={6}>
            <Stepper activeStep={activeStep}>
              <Step key={1}>
                <StepLabel>Selecciona las materias</StepLabel>
              </Step>
              <Step key={2}>
                <StepLabel>Verifica tus selecciones</StepLabel>
              </Step>
              <Step key={3}>
                <StepLabel>Procesar informacion</StepLabel>
              </Step>

            </Stepper>
          </Grid>
        </Grid>
				<Grid
					container
					justify="center"
					direction="row"
					spacing={40}
				>
          <Grid item xs={11} sm={5} md={3}>
						<SemestersList
							fetching={pensum.length === 0 && fetching}
							pensum={pensum}
							addCourse={this.addCourse}
							courses={courses}
						/>
          </Grid>
          <Grid item xs={11} sm={6} md={2}>
            <Paper className={classes.grid}>
							<SelectedCourses
								courses={courses}
								removeCourse={this.removeCourse}
							/>
            </Paper>
						{courses.length > 0 ? (
							<div className={classes.wrapper}>
								<Button
									raised
									onClick={() => this.getCoursesSections(courses)}
									className={classes.processBtn}
									color="primary"
									disabled={fetching}
								>
									Procesar informacion
								</Button>
								{fetching && <CircularProgress size={24} className={classes.buttonProgress} />}

							</div>
						)
							: null
						}
					</Grid>
          <Grid item xs={11} sm={11} md={6} >
            <Paper className={classes.grid}>
							{combinations.length > 0 ? (
								<Grid
									container
									justify="center"
									direction="row"
								>
									<Grid item xs={2}>
										<h4>LUNES</h4>
										{combinations[0].schedule.lunes.classes.map((classe) =>
											(
												<div>
													<h5>{classe.description}</h5>
												</div>
											)
										)}
									</Grid>
									<Grid item xs={2}>
										<h4>MARTES</h4>
										{combinations[0].schedule.martes.classes.map((classe) =>
											(
												<div>
													<h5>{classe.description}</h5>
												</div>
											)
										)}
									</Grid>
									<Grid item xs={2}>
										<h4>MIERCOLES</h4>
										{combinations[0].schedule.miercoles.classes.map((classe) =>
											(
												<div>
													<h5>{classe.description}</h5>
												</div>
											)
										)}
									</Grid>
									<Grid item xs={2}>
										<h4>JUEVES</h4>
										{combinations[0].schedule.jueves.classes.map((classe) =>
											(
												<div>
													<h5>{classe.description}</h5>
												</div>
											)
										)}
									</Grid>
									<Grid item xs={2}>
										<h4>VIERNES</h4>
										{combinations[0].schedule.viernes.classes.map((classe) =>
											(
												<div>
													<h5>{classe.description}</h5>
												</div>
											)
										)}
									</Grid>
									<Grid item xs={2}>
										<h4>SABADO</h4>
										{combinations[0].schedule.sabado.classes.map((classe) =>
											(
												<div>
													<h5>{classe.description}</h5>
												</div>
											)
										)}
									</Grid>
								</Grid>
								) : null}
            </Paper>
          </Grid>
        </Grid>
      </div>
		);
	}
}

ToolsPage.propTypes = {
	classes: PropTypes.object.isRequired,
	user: PropTypes.object,
};

const mapStateToProps = (state) => {
	const { user } = state.get('login');
	return { user };
};


export default withStyles(Styles)(connect(mapStateToProps, null)(ToolsPage));
