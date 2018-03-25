export function login({ id, password }) {
	const u = 'http://www.uru.edu:8080/uru-sv/test/login';
	return fetch(u, {
		method: 'post',
		headers: {
			'Content-type': 'application/json',
		},
		body: JSON.stringify({ username: id, password }),
	})
	.then((response) => response.json().then((json) => ({ json })))
	.then(({ json: response }) => {
		if (response.status === 200)
			return Promise.resolve(JSON.parse(response.data));
		return Promise.reject(response.message);
	})
	.then((response) => ({ response }), (error) => ({ error }));
}
