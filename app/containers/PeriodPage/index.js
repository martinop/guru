import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import { shuffle } from 'lodash';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import getMyCourses from '../../api/courses';
import getCourseData from '../../api/courseData';
import Styles from '../Styles/period';
import BoxItem from '../../components/boxItem';
import Loading from '../../components/loading';
import Chat from '../../components/chat';

const colors = shuffle(['#00509e', '#8bc34a', '#4caf50', '#03a9f4', '#009688', '#f44336', '#e91e63', '#ff5722', '#ff9800']);

class PeriodPage extends React.Component {
	state = {
		courses: [],
		fetching: true,
		selectedCourse: { },
		loading: true,
		files: [],
		messages: [],
	}

	componentDidMount() {
		getMyCourses(this.props.user.ced.toString())
			.then((courses) => {
				if (courses.length > 0)
					getCourseData(courses[0].id_subject).then((data) => {
						const { files, messages } = data;
						this.setState({ files, messages, courses, fetching: false, loading: false, selectedCourse: courses[0] });
					}).catch((err) => {
						console.log(err);
						this.setState({ courses, fetching: false, loading: false });
					});
				else
					this.props.history.push('/home');
			});
	}
	changeCourse = (course) => {
		this.setState({ loading: true });
		getCourseData(course.id_subject).then((data) => {
			const { files, messages } = data;
			this.setState({ loading: false, files, messages, selectedCourse: course });
		}).catch((err) => {
			console.log(err);
			this.setState({ loading: false });
		});
	}
	render() {
		const { classes, user, online } = this.props;
		const { courses, fetching, messages, selectedCourse, loading } = this.state;
		if (!fetching)
			return (
				<Grid
					container
					direction="row"
					justify="center"
					spacing={40}
					className={classes.container}
				>
					<Grid item xs={3} className={classes.title}>
						<Typography variant="display1">Materias cursando</Typography>
					</Grid>
					<Grid item xs={7} className={classes.title}>
						<Typography variant="display3">{selectedCourse.subject_name}</Typography>
					</Grid>
					<Grid item xs={11} sm={6} md={4} lg={3}>
						{courses.map((course, index) => (
							<BoxItem
								key={index}
								onClick={() => this.changeCourse(course)}
								customClasses={[classes.boxItem, selectedCourse.id_subject === course.id_subject ? classes.activeCourse : null]}
								label={course.subject_name}
								color={colors[index]}
							/>
						))}
					</Grid>
					<Grid item xs={11} sm={6} md={5} lg={5}>
						<Paper className={classes.content}>
							<Typography variant="display1">Chat</Typography>
							<Chat loading={loading} user={user} messages={messages} online={online} />
						</Paper>
					</Grid>
					<Grid item xs={11} sm={6} md={5} lg={3}>
						<Paper className={classes.content}>
							<Typography variant="display1">Archivos</Typography>
						</Paper>
					</Grid>
				</Grid>
			);
		return <Loading />;
	}
}

PeriodPage.propTypes = {
	classes: PropTypes.object.isRequired,
	user: PropTypes.object,
	online: PropTypes.bool,
	history: PropTypes.object,
};


export default withStyles(Styles)(PeriodPage);
