import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'material-ui/styles/withStyles';
import Chip from 'material-ui/Chip';
import Styles from './Styles/selectedCourses';

function SelectedCourses({ classes, courses, removeCourse }){
	return (
		<div>
			{courses.map((course, index) => (
				<Chip
					key={index}
					label={course.description}
					onDelete={() => removeCourse(index)}
					className={classes.chip}
					classes={{ label: classes.chipLabel }}
				/>
      ))}
      </div>
	);
}
SelectedCourses.propTypes = {
	classes: PropTypes.object.isRequired,
	courses: PropTypes.array.isRequired,
	removeCourse: PropTypes.func.isRequired,
};

export default withStyles(Styles)(SelectedCourses);
