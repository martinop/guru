import React from 'react';
import PropTypes from 'prop-types';
import ExpansionPanel, {
    ExpansionPanelSummary,
    ExpansionPanelDetails,
  } from 'material-ui/ExpansionPanel';

import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Tooltip from 'material-ui/Tooltip';
import withStyles from 'material-ui/styles/withStyles';
import parseSemesterName from '../utils/parseSemesterName';
import Styles from './Styles/semesterItemList';

const getMaxSemester = (courses) => courses.length > 0 ? courses.sort((a, b) => a.sem - b.sem)[0] : null;

function SemesterListItem({ classes, semesterCourses, semesterNumber, currentCourses, addCourse }) {
	return (
		<ExpansionPanel key={semesterNumber}>
			<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
				<Typography className={classes.heading}>{parseSemesterName(semesterNumber)}</Typography>
			</ExpansionPanelSummary>
			<ExpansionPanelDetails className={classes.coursesSelector}>
				{semesterCourses.map((course) => {
					const exist = currentCourses.filter((c) => c.code === course.code).length;
					const withoutMyself = currentCourses.filter((c) => c.code !== course.code);
					const maxSemester = getMaxSemester(withoutMyself);
					let dispersion = false;
					if (exist > 0 && maxSemester && maxSemester.sem + 2 < course.sem)
						dispersion = true;

					const usingCourse = exist > 0 ? classes.activeCourse : null;
					const finalClass = [classes.noActiveCourse, classes.fullWidth];
					finalClass.push(dispersion ? classes.dispersionCourse : usingCourse);
					const renderButton = () =>
					(
							<Button
								className={finalClass.join(' ')}
								key={course.code}
								onClick={() => addCourse(course)}
							>
									{course.description}
							</Button>
					);

					if (!dispersion)
						return renderButton();
					return (
					<Tooltip title="Dispersion" placement="top-start">
							{renderButton()}
					</Tooltip>);
				})}
				</ExpansionPanelDetails>
		</ExpansionPanel>);
}

SemesterListItem.propTypes = {
	classes: PropTypes.object.isRequired,
	semesterNumber: PropTypes.number.isRequired,
	semesterCourses: PropTypes.array.isRequired,
	currentCourses: PropTypes.array.isRequired,
	addCourse: PropTypes.func.isRequired,
};
export default withStyles(Styles)(SemesterListItem);
