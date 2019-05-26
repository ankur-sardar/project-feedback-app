import Employee from '../models/employee';

import {ActionTypes} from '../actions/action';
import {Action} from '../actions/action';

// Define our State interface for the current reducer
export interface State {
  employeeList: Employee[]
}

// Define our initialState
export const initialState: State = {
  employeeList: [] // We don't have any Employee List at the start of the app
}


/* 
 * Reducer takes 2 arguments
 * state: The state of the reducer. By default initialState ( if there was no state provided)
 * action: Action to be handled. Since we are in employeelist reducer, action type is Action defined in our actions/employees file.
 */
export function reducer(state: State = initialState, action: Action) {
  switch (action.type) {

    case ActionTypes.ADD_EMPLOYEE: {
      /*
       * We have autocompletion here
       * Typescript knows the action is type of AddEmployeeAction thanks to the ActionTypes enum
       * todo is type of Todo
       */
      const employee = action.payload.employee
      console.log(employee);
      return {
        ...state,
        employeeList: [...state.employeeList, employee] // Add employee to employeeList array
      }
    }
    case ActionTypes.REMOVE_EMPLOYEE: {
      /*
       * This is the same as 
       * const todoId = action.payload.todoId
       */
      const { id } = action.payload;
      return {
        ...state,
        employeeList: state.employeeList.filter(employee => employee.id !== id)
      }
    }
    case ActionTypes.GET_EMPLOYEE_LIST: {
      /*
       * This is the same as 
       * const todoId = action.payload.todoId
       */
      console.log('in Action Payload');
      console.log(action.payload);
      return {
        ...state,
        employeeList: action.payload.employeeList
      }
    }
    default:
      return state
  }
}
