import axios from 'axios';
import pouchdb from './db';
import isOnline from './isOnline';

const base = 'http://www.uru.edu:8080/uru-sv/test/';

const instance = axios.create({
	baseURL: base,
});

instance.interceptors.request.use(
	(config) => {
		config.headers['Content-type'] = 'application/json';
		config.withCredentials = true;
		return config;
	},
	(err) => Promise.reject(err),
);

const methods = {
	get: (url) => {
		const key = url;
		const dataFromDB = () => pouchdb.get(key).then((response) => Promise.resolve(response)).catch((error) => Promise.resolve({ error }));
		return new Promise((resolve, reject) =>
			isOnline()
			.then(() =>
				Promise.all([instance.get(url), dataFromDB()])
				.then((response) => {
					const {
						data,
					} = response[0];
					const res = response[1];
					if (data.status === 200) {
						if (res.data) pouchdb.put({
							_id: key,
							data: JSON.parse(data.data),
							_rev: res._rev,
						});
						else pouchdb.put({
							_id: key,
							data: JSON.parse(data.data),
						});
					}

					resolve(data);
				})
				.catch((error) => reject({
					error: error.message || 'Error inesperado',
				})),
			)
			.catch(() =>
				dataFromDB()
				.then((res) => {
					if (!res.error) resolve(res.data);
					reject({
						error: 'No se encontro informacion almacenada',
					});
				})
				.catch((error) => reject({
					error: error.message || 'Error inesperado',
				})),
			),
		);
	},
	post: instance.post,
};
export default methods;
