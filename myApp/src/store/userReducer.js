const defaultState = {
	user: JSON.parse(localStorage.getItem('user')) || {gas: []},
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

		case 'ADD_GAS':
			newState = {
				...state,
				user: {
					...state.user,
					gas: [...state.user.gas, { ...action.payload }]
				},
			}
			
			localStorage.setItem('user', JSON.stringify(newState.user))
			return newState

		default:
			return state
	}
}
