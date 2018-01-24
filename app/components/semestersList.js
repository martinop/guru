import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'material-ui/styles/withStyles';
import { CircularProgress } from 'material-ui/Progress';
import Paper from 'material-ui/Paper';
import Styles from './Styles/semestersList';
import SemesterListItem from './semesterItemList';

function SemestersList({ classes, fetching, pensum, courses, addCourse }) {
	return (
		<div>
			{!fetching && pensum.map((semester, index) => (
				<SemesterListItem
					key={index + 1}
					semesterNumber={index + 1}
					semesterCourses={semester}
					currentCourses={courses}
					addCourse={addCourse}
				/>
			))}
			{fetching &&
				<Paper className={classes.gridLoading}>
					<CircularProgress className={classes.pensumProgress} size={50} thickness={7} />
						</Paper>
			}
    </div>
	);
}

SemestersList.propTypes = {
	classes: PropTypes.object.isRequired,
	fetching: PropTypes.bool,
	pensum: PropTypes.array,
	courses: PropTypes.array,
	addCourse: PropTypes.func,
};
export default withStyles(Styles)(SemestersList);
