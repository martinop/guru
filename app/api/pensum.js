import { groupBy } from 'lodash';
import axios from '../utils/axios';

export default () =>
	axios.get('subject/getPensum')
		.then((response) => {
			if (response.status === 200) {
				const data = JSON.parse(response.data);
				return Promise.resolve(groupBy(data.pensum, 'sem'));
			}
			return Promise.reject(response.message);
		});
