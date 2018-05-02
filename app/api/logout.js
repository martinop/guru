import axios from '../utils/axios';
import pouchdb from '../utils/db';

export default () =>
	axios.get('http://www.uru.edu:8080/uru-sv/test/logout')
		.then(() =>
            pouchdb.destroy()
                .then(() => Promise.resolve({ message: 'Everything is ok' }))
                .catch(() => Promise.resolve({ message: 'Everything is ok' }))
		);
