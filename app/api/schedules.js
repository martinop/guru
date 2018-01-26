export default (subjects, cookie) =>
	fetch('http://guru-sv.risky.rocks/API/schedules', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ subjects, cookie }),
	})
	.then((response) => response.json());
