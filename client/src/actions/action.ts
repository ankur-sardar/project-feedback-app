import Employee from "../models/employee";
import {http} from "../services/employee-service";
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
/*
 * To generate automatic Id for employees
 */

export enum ActionTypes {
  ADD_EMPLOYEE = "ADD_EMPLOYEE",
  REMOVE_EMPLOYEE = "REMOVE_EMPLOYEE",
  GET_EMPLOYEE_LIST = "GET_EMPLOYEE_LIST"
}
/*
 * Define return types of our actions
 * Every action returns a type and a payload
 */
export interface AddEmployeeAction {
  type: ActionTypes.ADD_EMPLOYEE;
  payload: { employee: Employee };
}
export interface DeleteEmployeeAction {
  type: ActionTypes.REMOVE_EMPLOYEE;
  payload: { id: number };
}
export interface GetEmployeeList {
  type: ActionTypes.GET_EMPLOYEE_LIST;
  payload: { employeeList: [] };
}

/*
 * Define our actions creators
 * We are returning the right Action for each function
 */

export function addEmployee(name: string, id: number): AddEmployeeAction {
  fetch('http://localhost:9000/addEmployeeAPI', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({name: name, id: id}),
  });
  return {
    type: ActionTypes.ADD_EMPLOYEE,
    payload: {
      employee: {
        id: id,
        name: name
      }
    }
  };
}

export function deleteEmployee(id: number): DeleteEmployeeAction {
  fetch('http://localhost:9000/removeEmployeeAPI', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({id: id}),
  });
  
  return {
    type: ActionTypes.REMOVE_EMPLOYEE,
    payload: {
      id: id
    }
  };
}

export function getList(list: []): GetEmployeeList {
  console.log("Dispatch getList");
  console.log(list);
  return {
    type: ActionTypes.GET_EMPLOYEE_LIST,
    payload: {
      employeeList: list
    }
  };
}

// thunk action
export const getEmployeeListApi = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  // Invoke API
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    return new Promise<void>(async (resolve) => {
      // dispatch(isFetching(true))
      console.log('Fetching in progress')
      const list = await http("http://localhost:9000/fetchListAPI");
      console.log(list);
      dispatch(getList(list));
    })
  }
}

// thunk action
// export const addEmployeeAPI = (name: string, id: number): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
//   // Invoke API
//   return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
//     return new Promise<void>(async (resolve) => {
//       // dispatch(isFetching(true))
//       console.log('Adding Employee in progress')
//       fetch('http://localhost:9000/addEmployeeAPI', {
//         method: 'POST',
//         // headers: {} <-- You can include some headers if you want
//         body: JSON.stringify({name: name, id: id})
//       });
//       dispatch(addEmployee(name, id));
//     })
//   }
// }
/*
 * Define the Action type
 * It can be one of the types defining in our action/todos file
 * It will be useful to tell typescript about our types in our reducer
 */
export type Action = AddEmployeeAction | DeleteEmployeeAction | GetEmployeeList;
