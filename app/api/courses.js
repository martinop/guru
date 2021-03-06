import axios from '../utils/axios';

export default (userId) =>
	axios.get(`http://localhost:59954/courses/${userId}`)
		.then((response) => {
			if (response.status === 200 || !response.status) {
				const getData = () => typeof response.data === 'object' ? response.data : JSON.parse(response.data);
				const data = response.status ? getData() : response;
				return Promise.resolve(data);
			}
			return Promise.reject(response.message);
		});
