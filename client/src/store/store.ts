import { createStore, applyMiddleware } from 'redux'
import { State, reducer, initialState } from '../reducers/reducer';
import thunk from "redux-thunk";


declare global {
  interface Window { __REDUX_DEVTOOLS_EXTENSION__: any; }
}
/*
 * We're giving State interface to create store
 * store is type of State defined in our reducers
 */
const store = createStore<State,any,any,any>(reducer, initialState, applyMiddleware(thunk));

export default store