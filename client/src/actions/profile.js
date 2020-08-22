import axios from 'axios'
import { PROFILE_ERROR, GET_PROFILE } from './types'

export const getProfile = () => async (dispatch) => {
	try {
		const res = await axios.get('api/profile/me')

		dispatch({ type: GET_PROFILE, payload: res.data })
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		})
	}
}

export const createProfile = (form) => async (dispatch) => {
	try {
		const res = await axios.post('api/profile', form, {
			'Content-Type': 'application/json',
		})

		dispatch({ type: GET_PROFILE, payload: res.data })
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		})
	}
}
