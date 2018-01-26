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
import Typography from 'material-ui/Typography';
import SelectedCourses from '../../components/selectedCourses';
import { scheduleMaker } from '../../utils/scheduleMaker';
import SemestersList from '../../components/semestersList';
import ScheduleDay from '../../components/scheduleDay';
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
		fetch(`http://guru-sv.risky.rocks/API/pensum?cookie=${this.props.user.cookie}`)
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
			fetch('http://guru-sv.risky.rocks/API/schedules', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ subjects, cookie: this.props.user.cookie }),
			})
			.then((response) => response.json())
			.then((data) => {
				console.log('Success');
				this.setState({ fetching: false });
				scheduleMaker(data.schedules, (r) => {
					console.log(r)
					const { schedules, notifications } = r;
					this.setState({ combinations: schedules, notifications, activeStep: 3 });
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
		this.setState({ courses: coursesToState, activeStep: 1 });
	};

	render() {
		const { pensum, fetching, courses, combinations, activeStep } = this.state;
		if(combinations.length > 0)
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
          <Grid item xs={11} sm={5} md={2}>
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
									disabled={activeStep === 2}
								>
									{activeStep === 2 ? (fetching ? 'Obteniendo Informacion' : 'Procesando Informacion') : 'Optimizar horario'}
								</Button>
								{fetching && <CircularProgress size={24} className={classes.buttonProgress} />}

							</div>
						)
							: null
						}
					</Grid>
          <Grid item xs={11} sm={11} md={7} >
            <Paper className={classes.grid}>
							<Typography type="display1" gutterBottom>
								Mejores Combinaciones
							</Typography>
							{combinations.length > 0 ? (
								<Grid
									container
									justify="center"
									direction="row"
									spacing={20}
								>
									<Grid item xs={2}>
										<ScheduleDay
											label="Lunes"
											courses={combinations[0].schedule.lunes.classes}
										/>
									</Grid>
									<Grid item xs={2}>
										<ScheduleDay
											label="Martes"
											courses={combinations[0].schedule.martes.classes}
										/>
									</Grid>
									<Grid item xs={2}>
										<ScheduleDay
											label="Miercoles"
											courses={combinations[0].schedule.miercoles.classes}
										/>
									</Grid>
									<Grid item xs={2}>
										<ScheduleDay
											label="Jueves"
											courses={combinations[0].schedule.jueves.classes}
										/>
									</Grid>
									<Grid item xs={2}>
										<ScheduleDay
											label="Viernes"
											courses={combinations[0].schedule.viernes.classes}
										/>
									</Grid>
									<Grid item xs={2}>
										<ScheduleDay
											label="Sabado"
											courses={combinations[0].schedule.sabado.classes}
										/>
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
