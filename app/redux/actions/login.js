import axios from '../../utils/axios';

export function login({ id, password }) {
	const u = 'http://www.uru.edu:8080/uru-sv/test/login';
	return axios.post(u, { username: id, password })
		.then((data) => Promise.resolve(data))
		.then(({ data: response }) => {
			if (response.status === 200)
				return Promise.resolve(JSON.parse(response.data));
			return Promise.reject(response.message);
		})
		.then((response) => ({ response }), (error) => ({ error: JSON.stringify(error) }));
}

export function validateSession() {
	const u = 'http://www.uru.edu:8080/uru-sv/test/status/sessionStatus';
	return axios.get(u)
		.then((response) => {
			if (!response.status) {
				return Promise.resolve(response);
			}
			else if (response.status === 200)
				return Promise.resolve(JSON.parse(response.data));
			return Promise.reject(response.message);
		})
		.then((response) => ({ response }), (error) => ({ error: JSON.stringify(error) }));
}
