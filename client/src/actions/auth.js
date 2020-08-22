import axios from 'axios'
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_PROFILE,
} from './types'
import setAuthToken from './../utils/setAuthToken'

export const loadUser = () => async (dispatch) => {
	if (document.cookie) {
		setAuthToken(document.cookie)
	}

	try {
		const res = await axios.get('/api/auth/me')

		dispatch({ type: USER_LOADED, payload: res.data })
	} catch (err) {
		dispatch({ type: AUTH_ERROR })
	}
}

export const register = ({ name, email, password }) => async (dispatch) => {
	try {
		const res = await axios.post(
			'/api/auth/register',
			JSON.stringify({ name, email, password }),
			{
				headers: {
					'Content-type': 'application/json',
				},
			}
		)

		dispatch({ type: REGISTER_SUCCESS, payload: res.data })

		dispatch(loadUser())
	} catch (err) {
		dispatch({ type: REGISTER_FAIL })
	}
}

export const login = (email, password) => async (dispatch) => {
	try {
		const res = await axios.post(
			'/api/auth/login',
			JSON.stringify({ email, password }),
			{
				headers: {
					'Content-type': 'application/json',
				},
			}
		)

		dispatch({ type: LOGIN_SUCCESS, payload: res.data })

		dispatch(loadUser())
	} catch (err) {
		dispatch({ type: LOGIN_FAIL })
	}
}

export const logout = () => async (dispatch) => {
	dispatch({ type: CLEAR_PROFILE })
	dispatch({ type: LOGOUT })
}
