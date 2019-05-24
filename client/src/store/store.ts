import { createStore } from 'redux'
import { State, reducer, initialState } from '../reducers/reducer';

/*
 * We're giving State interface to create store
 * store is type of State defined in our reducers
 */
const store = createStore<State,any,any,any>(reducer, initialState)

export default store