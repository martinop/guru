import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Styles from '../Styles/course';
import getCourseData from '../../api/courseData';
class CoursePage extends React.Component {
	state = {
		messages: [],
		files: [],
	}

	componentDidMount() {
		if (!this.props.location.state)
			this.props.history.push('/period');
		else {
			const { state: { id_subject } } = this.props.location;
			getCourseData(id_subject).then((data) => {
				const { messages, files } = data;
				this.setState({ messages, files });
			});
		}
	}

	anotherMessage = (username, message, id) => (
        <div key={id} className={this.props.classes.messageBoxHolder} >
            <div className={this.props.classes.messageSender}>{username}</div>
            <div className={[this.props.classes.messageBox, this.props.classes.messagePartner].join(' ')}>
                {message}
            </div>
        </div>
    )

	myMessage = (message, _id) => (
        <div key={_id} className={this.props.classes.messageBoxHolder}>
            <div className={this.props.classes.messageBox}>{message}</div>
        </div>
    )
	render() {
		if (!this.props.location.state)
			return null;
		const { classes, location, user } = this.props;
		const { state: { subject_name } } = location;
		const { messages, files } = this.state;
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
					<Grid item xs={11} sm={4} md={4}>
						<Paper className={classes.grid}>
							<Typography variant="display1">Chat</Typography>
							<div className={classes.chatMessages} >
								{messages && messages.map((m, index) => {
									const { message, id_user, username } = m;
									if (id_user === user.ced.toString())
										return this.myMessage(message, index);
									return this.anotherMessage(username, message, index);
								})}
							</div>
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
