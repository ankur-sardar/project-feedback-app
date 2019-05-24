import Employee from "../models/employee";

/*
 * To generate automatic Id for employees
 */

let nextId = 1;
export enum ActionTypes {
  ADD_EMPLOYEE = "ADD_EMPLOYEE",
  REMOVE_EMPLOYEE = "REMOVE_EMPLOYEE"
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

/*
 * Define our actions creators
 * We are returning the right Action for each function
 */

export function addEmployee(name: string): AddEmployeeAction {
  return {
    type: ActionTypes.ADD_EMPLOYEE,
    payload: {
      employee: {
        id: nextId++,
        name: name
      }
    }
  };
}

export function deleteEmployee(id: number): DeleteEmployeeAction {
  return {
    type: ActionTypes.REMOVE_EMPLOYEE,
    payload: {
      id: id
    }
  };
}

/*
 * Define the Action type
 * It can be one of the types defining in our action/todos file
 * It will be useful to tell typescript about our types in our reducer
 */
export type Action = AddEmployeeAction | DeleteEmployeeAction;
