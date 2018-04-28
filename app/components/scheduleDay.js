import React from 'react';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import Styles from './Styles/scheduleDay';

function ScheduleDay({ classes, label, courses }) {
	return (
		<div className={classes.root}>
			<Typography variant="title" gutterBottom style={{ fontWeight: '600' }}>
				{label.toUpperCase()}
      </Typography>
			<Divider classes={{ root: classes.divider }} light />
			{courses.map((course, index) =>
				(
					<div key={index} className={classes.mTop}>
						<Typography variant="subheading" gutterBottom >
							{course.description}
						</Typography>
						<Typography variant="subheading">
							{course.begin}
						</Typography>
						<Typography variant="subheading" gutterBottom>
							{course.end}
						</Typography>
						{course.classRoom &&
							<Typography variant="body2" gutterBottom className={classes.title}>
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
