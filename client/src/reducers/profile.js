import {} from './../actions/types'

const initialState = {
	profile: null,
	profiles: [],
	loading: true,
}

export default (state = initialState, action) => {
	const { type, payload } = action

	switch (type) {
		default:
			return {
				state,
			}
	}
}
