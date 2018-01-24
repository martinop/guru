export function hourInterferes(courseA, courseB){
    // TO DO: Refactor
    const cB = {begin: separateHour(courseB.begin), end: separateHour(courseB.end)}
    const cA = {begin: separateHour(courseA.begin), end: separateHour(courseA.end)}

    if(cB.begin.hour >= courseA.begin.hour && courseB.begin.hour < cA.end.hour
    || cA.begin.hour >= courseB.begin.hour && courseA.begin.hour < cB.end.hour)
        return true
    return false
};

export function separateHour(h) {
    const [hour, minutes] = h.split(":").map(e => parseInt(e))
    return {hour, minutes}
}

export function parseDay(day){
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

export function handleCoursesWInterf(days, courseHour){
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

export function getCombinations(options, optionIndex, results, current) {
    const allKeys = Object.keys(options);
    const optionKey = allKeys[optionIndex];

    const vals = options[optionKey];

    for (var i = 0; i < vals.length; i++) {
        current[optionKey] = vals[i];

        if (optionIndex + 1 < allKeys.length) {
            getCombinations(options, optionIndex + 1, results, current);
        } 
        else {
            var res = JSON.parse(JSON.stringify(current));
            results.push(res);
        }
    }

    return results;
}

export function timeBetween(beg, end){
    const totalBegMinutes = parseInt(beg.hour)*60 + parseInt(beg.minute)
    const totalEndMinutes = parseInt(end.hour)*60 + parseInt(end.minute)
    const difference = totalEndMinutes - totalBegMinutes
    return (difference/60)
}

export function handleAvailables(courseObj, globalSchedule){
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
export function modifySchedule(courseObj, newSchedule, currentSchedule){
    const tempSchedule = Object.assign({}, currentSchedule)
    const { course, schedules, description, hc, literal, professor, subject} = courseObj
    newSchedule.forEach(d=> tempSchedule[d.day].classes.push(Object.assign(d, {course: course, description: description, hc: hc, literal: literal, professor: professor, subject: subject})))
    return tempSchedule
}

export function scheduleMaker(courSchedules){
    let schedule = {
        lunes: {classes: []}, 
        martes: {classes: []}, 
        miercoles: {classes: []},
        jueves: {classes: []}, 
        viernes: {classes: []}, 
        sabado: {classes: []}
    }
    let baseSchedule = Object.assign({}, schedule)
    let schedulesCombinations = []

    //Specifies if a course has more than one section and parse day name
    courSchedules = courSchedules.map(e=> {
        e.unique = (courSchedules.filter(s => e.subject == s.subject).length) === 1 ? true : false
        e.schedules = e.schedules.map(schedule => Object.assign(schedule, {day: parseDay(schedule.day)}))
        return e
    })

    const coursesName = Array.from(new Set(courSchedules.map(e => e.description)))

    //Filter schedules by unique courses and set it as the base schedule
    const uniques = courSchedules.filter(c => c.unique)
    uniques.forEach(c => {
        const { course, schedules, description, hc, literal, professor, subject } = c
        tempSchedule = modifySchedule({ course, description, hc, literal, subject}, schedules, baseSchedule)
    })

    //Filter schedules by non uniques courses
    let multiples = courSchedules.filter(c => !c.unique)

    //if there's only unique courses add directly to schedules combinations
    if(multiples.length == 0)
        schedulesCombinations.push(uniques)
    else{
        //Get the name of the courses
        const coursesNameNU = Array.from(new Set(multiples.map(e => e.description)))
        //Group courses by name and sort the array by length
        multiples = coursesNameNU.map(name => multiples.filter(course => course.description == name)).sort((a,b) => b.length - a.length)

        const combinations = getCombinations(multiples, 0, [], {})
        combinations.forEach(combination => {
            const courses = Object.keys(combination).map(c => combination[c])
            let tempSchedule = JSON.parse(JSON.stringify(baseSchedule))
            courses.forEach(course => {
                const scheduleWithCourse = handleAvailables(course, tempSchedule)
                if(scheduleWithCourse)
                    tempSchedule = scheduleWithCourse
            })
            const names = new Set(Object.keys(tempSchedule)
                .map(day => tempSchedule[day].classes
                    .map(e => e.description).join(',')
                ).join(',').split(',').filter(e=> e != ''))

            //Add every generated schedule(if all courses were added) with the current course of the 2nd iteration
            if(names.size == coursesName.length){
                //Sort classes by Hour
                Object.keys(tempSchedule).map(day => {
                    tempSchedule[day].classes = tempSchedule[day].classes.sort((a,b) => {
                        const hourA = parseInt(a.begin.split(':')[0])
                        const hourB = parseInt(b.begin.split(':')[0])
                        return hourA - hourB
                    })
                })
                schedulesCombinations.push({freeDays: 0, freeHours: 0, schedule: tempSchedule})
            }
            else {
                const missingCourses = coursesName.filter(course => Array.from(names).indexOf(course) < 0)
                const missingDescription = missingCourses.map(n => `- ${n}\n`).join(' ')
                console.warn(`In some iteration we found missing courses: \n ${missingDescription}`)
            }

        })
    }

    //Calculate the free Hours
    schedulesCombinations.forEach(combination => {
        combination.freeHours = Object.keys(combination.schedule).reduce((previousValue, day) => {
            let classDay = Object.assign(combination.schedule[day], {freeHours: 0})
            for(let i = 0; i < classDay.classes.length-1; i++){
                const [currentClassHour, currentClassMinutes, ] = classDay.classes[i].end.split(':').map(e => parseInt(e))
                const [nextClassHour, nextClassMinutes, ] = classDay.classes[i+1].begin.split(':').map(e => parseInt(e))
                classDay.freeHours += timeBetween({hour: currentClassHour, minute: currentClassMinutes}, {hour: nextClassHour, minute: nextClassMinutes})
            }
            return previousValue + classDay.freeHours
        }, 0)
        combination.freeDays = Object.keys(combination.schedule).map(d => combination.schedule[d]).filter(e => e.classes.length === 0).length
    })

    //Sort Combinations by free days and separete in groups
    const group = schedulesCombinations
        .sort((a,b) => a.freeDays - b.freeDays)
        .reduce((r, a) =>{
            r[a.freeDays] = r[a.freeDays] || []
            r[a.freeDays].push(a);
            return r;
        }, Object.create(null));
    
    //Sort every group by free hours and concat all groups -> reverse to order by free days desc
    return schedulesCombinations = []
        .concat(...Object.keys(group)
        .map(e => group[e].sort((a,b) => a.freeHours -  b.freeHours))
        .reverse())

}