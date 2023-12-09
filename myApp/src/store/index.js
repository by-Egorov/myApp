import {createStore, combineReducers, compose} from 'redux'
import {userReducer} from './userReducer.js'
import {carReducer} from './carReducer.js'

const rootReducer = combineReducers({
    user: userReducer,
    car: carReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers())

export default store
