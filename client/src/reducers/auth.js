import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
} from './../actions/types'

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: null,
	loading: true,
	user: null,
}

export default (state = initialState, action) => {
	const { payload, type } = action

	switch (type) {
		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
			return {
				...state,
				...payload,
				isAuthenticated: true,
				loading: false,
			}
		case REGISTER_FAIL:
		case LOGIN_FAIL:
		case LOGOUT:
		case AUTH_ERROR:
			document.cookie = 'token=;'
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
			}
		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: payload,
			}
		default:
			return state
	}
}
