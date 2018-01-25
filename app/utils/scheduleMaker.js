import work from 'webworkify-webpack'

export function scheduleMaker(courSchedules, callback){
	let schedule = {
		lunes: {classes: []}, 
		martes: {classes: []}, 
		miercoles: {classes: []},
		jueves: {classes: []}, 
		viernes: {classes: []}, 
		sabado: {classes: []}
	}
	let baseSchedule = Object.assign({}, schedule)
	let tempSchedule = Object.assign({}, schedule)
	let schedulesCombinations = []
	const notifications = []
	//Specifies if a course has more than one section and parse day name
	courSchedules = courSchedules.map(e=> {
			e.unique = (courSchedules.filter(s => e.subject == s.subject).length) === 1 ? true : false
			e.schedules = e.schedules.map(schedule => Object.assign(schedule, {day: parseDay(schedule.day)}))
			return e
	})
	//course with unassigned day
	.filter(e => {
		if(!e.schedules[0].day)
			notifications.push({course: e.description, message: 'Unassigned Day'})
		return e.schedules[0].day
	})
	//Filter schedules by unique courses and set it as the base schedule
	const uniques = courSchedules.filter(c => c.unique)
	uniques.forEach(c => {
			const { course, schedules, description, hc, literal, professor, subject } = c
			tempSchedule = modifySchedule({ course, description, hc, literal, subject}, schedules, baseSchedule)
	})

	//Filter schedules by non uniques courses
	let multiples = courSchedules.filter(c => !c.unique)

	//if there's only unique courses add directly to schedules combinations
	if(multiples.length == 0){
		schedulesCombinations.push({freeHours: 0, freeDays: 0, schedule: tempSchedule})
		callback(schedulesCombinations, notifications);
	}
	else{
			//Get the name of the courses	
			const coursesName = Array.from(new Set(courSchedules.map(e => e.description)))
			const coursesNameNU = Array.from(new Set(multiples.map(e => e.description)))
			//Group courses by name and sort the array by length
			multiples = coursesNameNU.map(name => multiples.filter(course => course.description == name)).sort((a,b) => b.length - a.length)
			const workerInstance = work(require.resolve('./CoursesNoUniquesWorker.js'))
			workerInstance.addEventListener('message', (m) => {
				// Sort Combinations by free days and separete in groups
				const group = m.data
				.sort((a,b) => a.freeDays - b.freeDays)
				.reduce((r, a) =>{
						r[a.freeDays] = r[a.freeDays] || []
						r[a.freeDays].push(a);
						return r;
				}, Object.create(null));
				// Sort every group by free hours and concat all groups -> reverse to order by free days desc{
				callback({
					schedules: []
						.concat(...Object.keys(group)
							.map(e => group[e].sort((a,b) => a.freeHours -  b.freeHours))
							.reverse())
						.slice(0,20),	
					notifications,
				});
			}, false)
			workerInstance.postMessage({ coursesName, multiples, tempSchedule, baseSchedule, notifications })
	}

	function getCombinations(options, optionIndex, results, current) {
			const allKeys = Object.keys(options);
			const optionKey = allKeys[optionIndex];
			const allKeysLength = allKeys.length
			const vals = options[optionKey];
			const valsLenght =vals.length
			for (var i = 0; i < valsLenght; i++) {
					current[optionKey] = vals[i];
					if (optionIndex + 1 < allKeysLength) {
							getCombinations(options, optionIndex + 1, results, current);
					} 
					else {
							var res = JSON.parse(JSON.stringify(current));
							results.push(res);
					}
			}

			return results;
	}
	function getKeys(o, k, r){
		r=[];
		for(k in o)
			r.hasOwnProperty.call(o,k) && r.push(k);
		return r
	}
	function timeBetween(beg, end){
			const totalBegMinutes = parseInt((beg.hour)*60 + beg.minute);
			const totalEndMinutes = parseInt((end.hour)*60 + end.minute)
			const difference = totalEndMinutes - totalBegMinutes
			return (difference/60)
	}
	function handleAvailables(courseObj, globalSchedule){
			const { course, schedules, description, hc, literal, professor, subject} = courseObj
			let availablesCourse = []
			const classesPerWeek = schedules.length
			schedules.forEach(e=> { 
					const classHour = {begin: e.begin, end: e.end}
					//Create an array comparing the current course section with the non free days in the schedule
					const freeDays = Object.keys(globalSchedule).filter(d => globalSchedule[d].classes.length == 0)
					const noFreeDays = Object.keys(globalSchedule)
							.filter(d => globalSchedule[d].classes.length > 0)
							.filter(d=> d.indexOf(e.day) > -1)
							.map(d=> globalSchedule[d].classes)
					
					if(noFreeDays.length > 0){
							const onNoFreeDaysInterf = handleCoursesWInterf(noFreeDays, classHour)
							const withInterf = onNoFreeDaysInterf.filter(c => c.length > 0)
							const withNoInterf = onNoFreeDaysInterf.filter(c => c.length == 0)
							if(withInterf.length == 0){
									availablesCourse.push(e)
							}
					}
					else 
							availablesCourse.push(e)
			})
			if(availablesCourse.length == classesPerWeek){
					const courseInfo = {course: course, description: description, hc: hc, literal: literal, professor: professor, subject: subject}
					return modifySchedule(courseInfo, availablesCourse, globalSchedule)
			}   
			else
					return false
	}
	function modifySchedule(courseObj, newSchedule, currentSchedule){
			const tempSchedule = Object.assign({}, currentSchedule)
			const { course, schedules, description, hc, literal, professor, subject} = courseObj
			newSchedule.forEach(d=> {
				tempSchedule[d.day].classes.push(Object.assign(d, {course: course, description: description, hc: hc, literal: literal, subject: subject}))
			})
			return tempSchedule
	}
	function handleCoursesWInterf(days, courseHour){
			return days.map(day => {
					const availables = []
					day.forEach(c => {
							const courseA = {begin: c.begin, end: c.end}
							const courseB = {begin: courseHour.begin, end: courseHour.end}
							//console.log(c.description, " | ",description)
							//console.log(c.begin,"-",c.end, " | ",courseHour.begin, "-", courseHour.end)
							//console.log(hourInterferes(courseA, courseB))
							if(hourInterferes(courseA, courseB))
									availables.push(c)
					})
					return availables
			})
	}
	function parseDay(day){
			switch(day){
					case "1": 
							return "lunes"
					case "2": 
							return "martes"
					case "3": 
							return "miercoles"
					case "4": 
							return "jueves"
					case "5": 
							return "viernes"
					case "6": 
							return "sabado"
			}
	}
	function hourInterferes(courseA, courseB){
			//TO DO: Refactor
			const cB = {begin: separateHour(courseB.begin), end: separateHour(courseB.end)}
			const cA = {begin: separateHour(courseA.begin), end: separateHour(courseA.end)}

			if(cA.begin.hour <= cB.begin.hour && cA.end.hour >= cB.begin.hour
				|| cA.begin.hour < cB.end.hour && cA.end.hour >= cB.end.hour
			)
					return true
			else
					return false
	}
	function separateHour(h){
			const [hour, minutes] = h.split(":").map(e => parseInt(e))
			return {hour, minutes}
	}
}