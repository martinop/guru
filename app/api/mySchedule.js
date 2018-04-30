import axios from '../utils/axios';

export default () =>
	axios.get('http://www.uru.edu:8080/uru-sv/test/status/getStudentSchedule')
		.then((response) => {
			if (response.status === 200 || !response.status) {
				const data = response.status ? JSON.parse(response.data) : response;
				const days = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
				const parseDay = (day) => {
					switch (day) {
					case '1':
						return 'lunes';
					case '2':
						return 'martes';
					case '3':
						return 'miercoles';
					case '4':
						return 'jueves';
					case '5':
						return 'viernes';
					case '6':
						return 'sabado';
					default:
						return '';
					}
				};
				const schedule = days.reduce((p, day) => ({ ...p, [day]: { classes: [] } }), {});
				const courses = data.schedule.map((course) => {
					course.schedules = course.schedules.map((c) => {
						c.day = parseDay(c.day);
						return c;
					});
					return course;
				});
				courses.forEach((c) => {
					const { course, schedules, description, subject, hc, literal } = c;
					schedules.forEach((classe) => {
						const { day, classRoom, begin, end } = classe;
						if (schedule[day])
							schedule[day].classes.push({ classRoom, begin, end, course, description, subject, hc, literal });
					});
				});
				return Promise.resolve(schedule);
			}
			return Promise.reject(response.message);
		});
