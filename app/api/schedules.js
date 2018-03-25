export default (subjects) =>
	fetch('http://www.uru.edu:8080/uru-sv/test/subject/schedule', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ subjects }),
		credentials: 'include',
	})
	.then((response) => response.json().then((json) => ({ json })))
	.then(({ json: response }) => {
		if (response.status === 200)
			return Promise.resolve(JSON.parse(response.data));
		return Promise.reject(response.message);
	});
