import { put, call } from 'redux-saga/effects';
import { isEmpty } from 'lodash';
import LoginActions from '../redux/redux-login';
import { login as l } from '../redux/actions/login';
import pouchdb from '../utils/db';

export function* login({ id, password }) {
	if (isEmpty(password) || isEmpty(id))
		yield put(LoginActions.loginFailure('WRONG'));

	else {
		const credentials = { id, password };
		const { data } = yield call(getFromDB);
		if (data) {
			yield put(LoginActions.loginSuccess(data));
		}
		else {
			const { response, error } = yield call(l, credentials);
			if (response === undefined || error)
				yield put(LoginActions.loginFailure(error));
			else {
				pouchdb.put({
					_id: 'login',
					data: response,
				});
				yield put(LoginActions.loginSuccess(response));
			}
		}
	}
}

function getFromDB() {
	return pouchdb.get('login')
		.then((res) => Promise.resolve({ data: res }))
		.catch((err) => Promise.resolve({ error: err }));
}

export function* logout() {
	yield put(LoginActions.logoutSuccess());
}
