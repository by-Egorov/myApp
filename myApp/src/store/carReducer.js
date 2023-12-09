const defaultState = {
	car: JSON.parse(localStorage.getItem('car')) || null,
}
export const carReducer = (state = defaultState, action) => {
	let newState
	switch (action.type) {
			case 'ADD_CAR_INFO':
					newState = {
							...state,
							car: {...state.car, ...action.payload},
					}
					localStorage.setItem('car', JSON.stringify(newState.car))
					return newState
			default:
					return state
	}
}
