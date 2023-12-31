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

		case 'ADD_SPARES':
			newState = {
				...state,
				user: {
					...state.user,
					spares: [...state.user.spares, { ...action.payload }]
				},
			}

			localStorage.setItem('user', JSON.stringify(newState.user))
			return newState

		case 'ADD_ACCESSORIES':
			newState = {
				...state,
				user: {
					...state.user,
					accessories: [...state.user.accessories, { ...action.payload }]
				},
			}

			localStorage.setItem('user', JSON.stringify(newState.user))
			return newState

			case 'ADD_CAR_IMAGE':
				newState = {
					...state,
					user: {
						...state.user,
						...action.payload
					}
				}

				localStorage.setItem('user', JSON.stringify(newState.user))
				return newState
		default:
			return state
	}
}
