import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
	loginRequest: ['id', 'password'],
	loginSuccess: ['user'],
	loginFailure: ['error'],
	logoutRequest: [],
	logoutSuccess: [],
});

export const LoginTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
	user: null,
	error: null,
	fetching: false,
});

export const request = (state) => state.merge({ fetching: true });

export const success = (state, { user }) =>
  state.merge({ fetching: false, error: null, user });

export const failure = (state, { error }) =>
  state.merge({ fetching: false, error });

export const logout = () => INITIAL_STATE;

export const reducer = createReducer(INITIAL_STATE, {
	[Types.LOGIN_REQUEST]: request,
	[Types.LOGIN_SUCCESS]: success,
	[Types.LOGIN_FAILURE]: failure,
	[Types.LOGOUT_REQUEST]: request,
	[Types.LOGOUT_SUCCESS]: logout,
});

export const isLoggedIn = (loginState) => loginState.user !== null;
