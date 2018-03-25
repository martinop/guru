import axios from '../../utils/axios';

export function login({ id, password }) {
	const u = 'login';
	return axios.post(u, { username: id, password })
		.then((data) => Promise.resolve(data))
		.then(({ data: response }) => {
			if (response.status === 200)
				return Promise.resolve(JSON.parse(response.data));
			return Promise.reject(response.message);
		})
		.then((response) => ({ response }), (error) => ({ error }));
}

export function validateSession() {
	const u = 'status/sessionStatus';
	return axios.get(u)
		.then((response) => {
			if (response.status === 200)
				return Promise.resolve(JSON.parse(response.data));
			return Promise.reject(response.message);
		})
		.then((response) => ({ response }), (error) => ({ error }));
}
