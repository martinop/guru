import work from 'webworkify-webpack';

export function scheduleMaker(coursesWithSchedules, callback) {
	const schedule = {
		lunes: { classes: [] },
		martes: { classes: [] },
		miercoles: { classes: [] },
		jueves: { classes: [] },
		viernes: { classes: [] },
		sabado: { classes: [] },
	};
	const baseSchedule = Object.assign({}, schedule);
	let tempSchedule = Object.assign({}, schedule);
	const schedulesCombinations = [];
	const notifications = [];
	// Specifies if a course has more than one section and parse day name
	const courSchedules = coursesWithSchedules.map((e) => {
		e.unique = (courSchedules.filter((s) => e.subject === s.subject).length) === 1;
		e.schedules = e.schedules.map((sch) => Object.assign(sch, { day: parseDay(schedule.day) }));
		return e;
	})
	// course with unassigned day
	.filter((e) => {
		if (!e.schedules[0].day)
			notifications.push({ course: e.description, message: 'Unassigned Day' });
		return e.schedules[0].day;
	});
	// Filter schedules by unique courses and set it as the base schedule
	const uniques = courSchedules.filter((c) => c.unique);
	uniques.forEach((c) => {
		const { course, schedules, description, hc, literal, subject } = c;
		tempSchedule = modifySchedule({ course, description, hc, literal, subject }, schedules, baseSchedule);
	});

	// Filter schedules by non uniques courses
	let multiples = courSchedules.filter((c) => !c.unique);

	// if there's only unique courses add directly to schedules combinations
	if (multiples.length === 0) {
		schedulesCombinations.push({ freeHours: 0, freeDays: 0, schedule: tempSchedule });
		callback(schedulesCombinations, notifications);
	}	else {
			// Get the name of the courses
		const coursesName = Array.from(new Set(courSchedules.map((e) => e.description)));
		const coursesNameNU = Array.from(new Set(multiples.map((e) => e.description)));
			// Group courses by name and sort the array by length
		multiples = coursesNameNU
			.map((name) => multiples.filter((course) => course.description === name))
			.sort((a, b) => b.length - a.length);

		const workerInstance = work(require.resolve('./CoursesNoUniquesWorker.js'));
		workerInstance.addEventListener('message', (m) => {
				// Sort Combinations by free days and separete in groups
			const group = m.data
			.sort((a, b) => a.freeDays - b.freeDays)
			.reduce((r, a) => {
				const c = r;
				c[a.freeDays] = c[a.freeDays] || [];
				c[a.freeDays].push(a);
				return c;
			}, Object.create(null));
			// Sort every group by free hours and concat all groups -> reverse to order by free days desc{
			callback({
				schedules: []
					.concat(...Object.keys(group)
						.map((e) => group[e].sort((a, b) => a.freeHours - b.freeHours))
						.reverse())
					.slice(0, 20),
				notifications,
			});
		}, false);
		workerInstance.postMessage({ coursesName, multiples, tempSchedule, baseSchedule, notifications });
	}

	function modifySchedule(courseObj, newSchedule, currentSchedule) {
		const temp = Object.assign({}, currentSchedule);
		const { course, description, hc, literal, subject } = courseObj;
		newSchedule.forEach((d) => {
			temp[d.day].classes.push(Object.assign(d, { course, description, hc, literal, subject }));
		});
		return temp;
	}
	function parseDay(day) {
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
			return 'undefined';
		}
	}
}
