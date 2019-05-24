import { combineReducers } from 'redux'
import * as formEmployee from './employee';


/*
 * This is the root state of the app
 * It contains every substate of the app
 */
export interface State {
  employeeList: formEmployee.State
}

/*
 * initialState of the app
 */
export const initialState: State = {
  employeeList: formEmployee.initialState
}

/*
 * Root reducer of the app
 * Returned reducer will be of type Reducer<State>
 */

export const reducer = combineReducers<State>({
  employeeList: formEmployee.reducer
})
