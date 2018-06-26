import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import deckData from './decksReducer'

const rootReducer = combineReducers({ deckData })

const store = createStore(rootReducer, applyMiddleware(thunk))

store.subscribe(() => console.log(store.getState()))

export default store
