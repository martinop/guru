export function login({ id, password }) {
	const u = `http://guru-sv.risky.rocks/API/login/v2?cedula=${id}&password=${password}`;
	return fetch(u)
			.then((response) => response.json().then((json) => ({ json, response })))
			.then(({ json, response }) => {
				if (!response.ok)
					return Promise.reject(json);
				return Promise.resolve(json);
			})
			.then((response) => ({ response }), (error) => ({ error }));
}
