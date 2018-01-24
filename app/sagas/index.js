import { takeLatest } from 'redux-saga/effects'
import { LoginTypes } from '../redux/redux-login'
import { login, logout } from './sagas-login'

export default function* root() {
  yield [
    // some sagas only receive an action
    takeLatest(LoginTypes.LOGIN_REQUEST, login),
    takeLatest(LoginTypes.LOGOUT_REQUEST, logout)
  ]
}
