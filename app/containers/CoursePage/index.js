import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Styles from '../Styles/course';
import getCourseData from '../../api/courseData';
class CoursePage extends React.Component {
	componentDidMount() {
		if (!this.props.location.state)
			this.props.history.push('/period');
		else {
			const { state: { id_subject } } = this.props.location;
			getCourseData(id_subject).then((data) => {
				const [messages, files] = data;
				this.setState({ messages, files });
			});
		}
	}
	render() {
		if (!this.props.location.state)
			return null;
		const { classes, location } = this.props;
		const { state: { subject_name } } = location;
		const { messages, files } = this.state;
		console.log(messages, files);
		return (
			<div className={classes.root}>
				<Grid
					container
					justify="center"
					direction="row"
					spacing={40}
				>
					<Grid item xs={10} className={classes.title}>
						<Typography variant="display3">{subject_name}</Typography>
					</Grid>
					<Grid item xs={11} sm={7} md={7}>
						<Paper className={classes.grid}>
							<Typography variant="display1">Chat</Typography>
						</Paper>
					</Grid>
					<Grid item xs={11} sm={7} md={4}>
						<Paper className={classes.grid}>
							<Typography variant="display1">Archivos</Typography>
						</Paper>
					</Grid>
				</Grid>
			</div>

		);
	}
}
CoursePage.propTypes = {
	classes: PropTypes.object,
	user: PropTypes.object,
	history: PropTypes.object,
	location: PropTypes.object,
};
export default withStyles(Styles)(CoursePage);
