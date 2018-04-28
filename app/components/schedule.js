import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import { isEmpty } from 'lodash';
import ScheduleDay from './scheduleDay';

export default function Schedule({ gridSpacing, days }) {
	const { lunes, martes, miercoles, jueves, viernes, sabado } = days;
	return (
		<Grid container direction="row" spacing={gridSpacing}>
			{!isEmpty(lunes.classes) && (
				<Grid item xs={12} sm={3} md={2}>
					<ScheduleDay
						label="Lunes"
						courses={lunes.classes}
					/>
				</Grid>
			)}
			{!isEmpty(martes.classes) && (
				<Grid item xs={12} sm={3} md={2}>
					<ScheduleDay
						label="Martes"
						courses={martes.classes}
					/>
				</Grid>
			)}
			{!isEmpty(miercoles.classes) && (
				<Grid item xs={12} sm={3} md={2}>
					<ScheduleDay
						label="Miercoles"
						courses={miercoles.classes}
					/>
				</Grid>
			)}
			{!isEmpty(jueves.classes) && (
				<Grid item xs={12} sm={3} md={2}>
					<ScheduleDay
						label="Jueves"
						courses={jueves.classes}
					/>
				</Grid>
			)}
			{!isEmpty(viernes.classes) && (
				<Grid item xs={12} sm={3} md={2}>
					<ScheduleDay
						label="Viernes"
						courses={viernes.classes}
					/>
				</Grid>
			)}
			{!isEmpty(sabado.classes) && (
				<Grid item xs={12} sm={3} md={2}>
					<ScheduleDay
						label="Sabado"
						courses={sabado.classes}
					/>
				</Grid>
			)}
		</Grid>
	);
}
Schedule.propTypes = {
	days: PropTypes.object,
	gridSpacing: PropTypes.number,
};
Schedule.defaultProps = {
	gridSpacing: 0,
	days: {
		lunes: { classes: [] },
		martes: { classes: [] },
		miercoles: { classes: [] },
		jueves: { classes: [] },
		viernes: { classes: [] },
		sabado: { classes: [] },
	},
};

