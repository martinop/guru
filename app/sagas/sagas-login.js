import { put, call } from 'redux-saga/effects';
import { isEmpty } from 'lodash';
import LoginActions from '../redux/redux-login';
import { login as l } from '../redux/actions/login';

export function* login({ id, password }) {
	if (isEmpty(password) || isEmpty(id))
		yield put(LoginActions.loginFailure('WRONG'));

	else {
    // dispatch successful logins
		const data = { id, password };
		const { response, error } = yield call(l, data);
		if (response === undefined || error)
			yield put(LoginActions.loginFailure(error));
		else {
			const { school, name, cookie, period, ced } = response;
			yield put(LoginActions.loginSuccess({ school, name, cookie, period, ced }));
		}
	}
}

export function* logout() {
	yield put(LoginActions.logoutSuccess());
}
