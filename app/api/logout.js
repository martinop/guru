import axios from '../utils/axios';
import pouchdb from '../utils/db';

export default () =>
	axios.get('http://www.uru.edu:8080/uru-sv/test/logout')
        .then(() =>
            pouchdb.allDocs({ include_docs: true }).then((allDocs) =>
                allDocs.rows.map((row) => ({ _id: row.id, _rev: row.doc._rev, _deleted: true })))
                .then((deleteDocs) => pouchdb.bulkDocs(deleteDocs))
                .then(() => Promise.resolve({ message: 'Everything is ok' }))
                .catch(() => Promise.resolve({ message: 'Everything is ok' }))
		);
