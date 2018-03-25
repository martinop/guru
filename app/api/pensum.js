import { groupBy } from 'lodash';
import axios from '../utils/axios';

export default () =>
	axios.get('subject/getPensum')
		.then((response) => {
			if (response.status === 200 || !response.status) {
				const data = response.status ? JSON.parse(response.data) : response;
				return Promise.resolve(groupBy(data.pensum, 'sem'));
			}
			return Promise.reject(response.message);
		});
