/* eslint-disable react/no-array-index-key */

import React from 'react';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Stepper, { Step, StepLabel } from 'material-ui/Stepper';
import { connect } from 'react-redux';
import SelectedCourses from '../../components/selectedCourses';
import { scheduleMaker } from '../../utils/scheduleMaker';
import SemestersList from '../../components/semestersList';
import Styles from '../Styles/tools';

class ToolsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  state = {
    courses: [],
    pensum: [],
    fetching: false,
  }
  componentWillMount() {
    this.setState({ fetching: true });
    fetch(`http://guru.vnz.la/API/pensum?cookie=${this.props.user.cookie}`)
    .then((response) => response.json())
    .then((data) => {
      const pensum = Object.keys(data).map((sem) => data[sem]);
      this.setState({ pensum, fetching: false });
    });
  }

  getCoursesSections = (courses) =>
    new Promise((resolve) => {
      if (courses.length === 0)
        resolve([]);
      else {
        const subjects = courses.map((course) => course.code);
        fetch('http://guru.vnz.la/API/schedules', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ subjects, cookie: this.props.user.cookie }),
        })
        .then((response) => {
          console.log(response);
          return response.json();
        })
        .then((data) => {
          resolve(data);
        });
      }
    });

  addCourse = (course) => {
    const { courses } = this.state;
    let coursesToState = Object.assign({}, courses);
    if (courses.filter((c) => c.code === course.code).length === 0)
      coursesToState = courses.concat(course);

    else
      coursesToState = courses.filter((c) => c.code !== course.code);

    this.getCoursesSections(coursesToState)
      .then((schedules) => {
        this.setState({ courses: coursesToState, schedules });
      });
  };

  removeCourse = (index) => {
    const { courses } = this.state;
    const coursesToState = Object.assign({}, courses).filter((_, i) => i !== index);
    this.getCoursesSections(coursesToState)
      .then((schedules) => {
        this.setState({ courses: coursesToState, schedules });
      });
  };

  render() {
    const { pensum, fetching, courses, schedules } = this.state;
    console.log(schedules);
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
            <Stepper activeStep={0}>
              <Step key={1} completed={courses.length > 0}>
                <StepLabel>Selecciona las materias</StepLabel>
              </Step>
              <Step key={2} completed={false}>
                <StepLabel>Verifica tus selecciones</StepLabel>
              </Step>
              <Step key={3} completed={false}>
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
              fetching={fetching}
              pensum={pensum}
              addCourse={this.addCourse}
              courses={courses}
            />
          </Grid>
          <Grid item xs={11} sm={6} md={3}>
            <Paper className={classes.grid}>
              <SelectedCourses
                courses={courses}
                removeCourse={this.removeCourse}
              />
            </Paper>
          </Grid>
          <Grid item xs={11} sm={11} md={5} >
            <Paper className={classes.grid}>
              <h1>dsadsa</h1>
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
