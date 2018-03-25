import { groupBy } from 'lodash';

export default () =>
	fetch('http://www.uru.edu:8080/uru-sv/test/subject/getPensum', {
		headers: {
			'Content-type': 'application/json',
		},
		credentials: 'include',
	})
	.then((response) => response.json().then((json) => ({ json })))
	.then(({ json: response }) => {
		if (response.status === 200) {
			const data = JSON.parse(response.data);
			return Promise.resolve(groupBy(data.pensum, 'sem'));
		}
		return Promise.reject(response.message);
	});
