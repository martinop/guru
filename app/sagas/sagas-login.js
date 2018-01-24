import { put, call } from 'redux-saga/effects'
import LoginActions from '../redux/redux-login'
import { isEmpty, startCase, toLower } from 'lodash'
import { login as l } from '../redux/actions/login'
export function* login({ id, password }) {
  if (isEmpty(password) || isEmpty(id)) {
    // dispatch failure
    yield put(LoginActions.loginFailure('WRONG'))
  } else {
    // dispatch successful logins
    const data = { id, password }
    const { response, error } = yield call(l, data);
    if (response === undefined || error) {
      yield put(LoginActions.loginFailure(error))
    }
    else {
      let { school, name, cookie, period, ced} = response
      yield put(LoginActions.loginSuccess({ school, name, cookie, period, ced }))
    }
  }
}

export function* logout() {
  yield put(LoginActions.logoutSuccess())
  yield put(BillingActions.billingClear())
  yield put(ScheduleActions.scheduleClear())
  yield put(ScoresActions.scoresClear())
}
