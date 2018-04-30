import axios from '../utils/axios';

export default (subjects) =>
	axios.post('http://www.uru.edu:8080/uru-sv/test/subject/schedule', { subjects })
		.then((response) => {
			if (response.status === 200)
				return Promise.resolve(JSON.parse(response.data.data));
			return Promise.reject(response.message);
		});
