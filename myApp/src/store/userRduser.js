const defaultState = {
	user: JSON.parse(localStorage.getItem('user')) || {},
}
export const userReducer = (state = defaultState, action) => {
	switch (action.type) {
			case 'ADD_USER':
					const newState = {
							...state,
							user: {...state.user, ...action.payload},
					}
					localStorage.setItem('user', JSON.stringify(newState.user))
					return newState
			default:
					return state
	}
}
