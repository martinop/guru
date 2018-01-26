import React from 'react';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import Styles from './Styles/scheduleDay';

function ScheduleDay({ classes, label, courses }) {
	return (
		<div className={classes.root}>
			<Typography type="title" gutterBottom>
				{label.toUpperCase()}
      </Typography>
			<Divider classes={{ root: classes.divider }} light />
			{courses.map((course) =>
				(
					<div className={classes.mTop}>
						<Typography type="subheading" gutterBottom >
							{course.description}
						</Typography>
						<Typography type="subheading">
							{course.begin}
						</Typography>
						<Typography type="subheading" gutterBottom>
							{course.end}
						</Typography>
						{course.classRoom &&
							<Typography type="body2" gutterBottom className={classes.title}>
								{`SALON ${course.classRoom}`}
							</Typography>
						}
						<Divider classes={{ root: classes.divider }} light />
					</div>
				)
			)}
		</div>
	);
}
ScheduleDay.propTypes = {
	classes: PropTypes.object.isRequired,
	label: PropTypes.string,
	courses: PropTypes.array,
};
export default withStyles(Styles)(ScheduleDay);
