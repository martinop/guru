import axios from '../utils/axios';

export default (description, id_subject, id_user, file) => {
	const formData = new FormData();
	formData.append('file', file);
	formData.append('id_subject', id_subject);
	formData.append('id_user', id_user);
	formData.append('description', description);
	const config = {
		headers: {
			'content-type': 'multipart/form-data',
		},
	};
	return axios.post('http://localhost:59954/files', formData, config)
    .then((response) => Promise.resolve(response));
};

