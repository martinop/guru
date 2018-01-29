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
import ArrowBack from 'material-ui-icons/ArrowBack';
import ArrowForward from 'material-ui-icons/ArrowForward';
import SelectedCourses from '../../components/selectedCourses';
import { scheduleMaker } from '../../utils/scheduleMaker';
import SemestersList from '../../components/semestersList';
import Schedule from '../../components/schedule';
import CoursesWithSections from '../../api/schedules';
import Pensum from '../../api/pensum';
import Styles from '../Styles/tools';

class ToolsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

	state = {
		courses: [],
		pensum: [],
		fetching: false,
		combinations: [],
		activeStep: null,
		notifications: [],
		scheduleIndex: 0,
	}
	componentWillMount() {
		this.setState({ fetching: true });
		Pensum(this.props.user.cookie)
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
			CoursesWithSections(subjects, this.props.user.cookie)
				.then((data) => {
					console.log('Success');
					this.setState({ fetching: false, combinations: [] });
					scheduleMaker(data.schedules, (r) => {
						console.log(r);
						const { schedules, notifications } = r;
						this.setState({ combinations: schedules, notifications, activeStep: 3, scheduleIndex: 0 });
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
	handleSchedule = (forward) => {
		const { scheduleIndex } = this.state;
		if (forward)
			this.setState({ scheduleIndex: scheduleIndex + 1 });
		else
			this.setState({ scheduleIndex: scheduleIndex - 1 });
	}
	render() {
		const { pensum, fetching, courses, combinations, activeStep, scheduleIndex } = this.state;
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
						{combinations.length > 0 ? (
							<div>
								<Typography type="display1" gutterBottom>
									Mejores Combinaciones
								</Typography>
								<div className={classes.mBottom}>
									{scheduleIndex - 1 >= 0 &&
										<Button
											fab
											className={classes.mRight}
											onClick={() => this.handleSchedule(false)}
											color="primary"
											aria-label="back"
										>
											<ArrowBack />
										</Button>
									}
									{scheduleIndex + 1 < combinations.length &&
										<Button
											fab
											className={classes.mRight}
											onClick={() => this.handleSchedule(true)}
											color="secondary"
											aria-label="next"
										>
											<ArrowForward />
										</Button>
									}
								</div>
								<Schedule
									days={combinations[scheduleIndex].schedule}
								/>
							</div>
						) : (
								activeStep === 2 && !fetching &&
									<div className={classes.gridLoading}>
										<CircularProgress className={classes.processProgress} size={70} thickness={7} />
									</div>
						)}
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
