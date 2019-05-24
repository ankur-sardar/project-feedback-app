import {State} from '../reducers/reducer';
import { createSelector } from 'reselect'


/*
 * Get the todos state from the root state
 */
const getEmployeeListState = ((state: State) => state.employeeList);

/*
 * Getting todos array from todos State
 */
export const getEmployeeList = createSelector([getEmployeeListState], s => s.employeeList)
