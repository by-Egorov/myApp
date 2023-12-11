const defaultState = {
	user: JSON.parse(localStorage.getItem('user')) || null
}
export const userReducer = (state = defaultState, action) => {
	let newState
	switch (action.type) {
		case 'ADD_USER':
			newState = {
				...state,
				user: { ...state.user, ...action.payload },
			}
			localStorage.setItem('user', JSON.stringify(newState.user))
			return newState

		default:
			return state
	}
}
