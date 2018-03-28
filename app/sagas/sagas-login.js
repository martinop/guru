import { put, call } from 'redux-saga/effects';
import { isEmpty } from 'lodash';
import LoginActions from '../redux/redux-login';
import { login as l, validateSession } from '../redux/actions/login';
import pouchdb from '../utils/db';

export function* login({ id, password }) {
	if (isEmpty(password) || isEmpty(id))
		yield put(LoginActions.loginFailure('WRONG'));

	else {
		const credentials = { id, password };

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

export function* withSession() {
	yield put(LoginActions.loginWithSessionRequest());
	const { response, error } = yield call(validateSession);
	if (error)
		yield put(LoginActions.loginFailure(error));
	else
		yield put(LoginActions.loginSuccess(response));
}
export function* logout() {
	yield put(LoginActions.logoutSuccess());
}
