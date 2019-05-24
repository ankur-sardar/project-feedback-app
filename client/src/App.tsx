import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import {State} from './reducers/reducer'
import {addEmployee, deleteEmployee} from './actions/action';
import {getEmployeeList} from './selectors/employeeList';
import Employee from './models/employee';
import { Dispatch } from 'redux';

import './App.css';
import 'antd/dist/antd.css';

import LandingPage from './components/landing-page';
import {
  Route,
  Switch,
} from "react-router-dom";
interface IProps {
  employeeList: Employee[]
}

interface IDispProps {
  addEmployee: (name: string) => void;
  deleteEmployee: (id: number) => void
}
interface IState {
}

const mapStateToProps = (state: State) => ({
  employeeList: getEmployeeList(state)
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addEmployee: (name:string) => dispatch(addEmployee(name)),
  deleteEmployee: (id:number) => dispatch(deleteEmployee(id))
})


const EmployeePage = React.lazy(() => import('./components/employee/employee'));
const AdminPage = React.lazy(() => import('./components/admin/admin'));
const EmployeeListView = React.lazy(() => import('./components/admin/employee-list-view/employee-list-view'));

export class App extends React.Component<IProps & IDispProps, IState>  {
  render() {
    return (
          <React.Fragment>
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route
                exact
                path="/admin"
                render={() => (
                  <Suspense fallback={<div>Loading...</div>}>
                    <AdminPage />
                  </Suspense>
                )}
              />
              <Route exact
                path="/employee"
                render={() => (
                  <Suspense fallback={<div>Loading...</div>}>
                    <EmployeePage />
                  </Suspense>
                )}
              />
              <Route exact
                path="/admin/employee-list"
                render={() => (
                  <Suspense fallback={<div>Loading...</div>}>
                    <EmployeeListView employeeList={this.props.employeeList} handleSubmit={this.props.addEmployee} removeEmployee={this.props.deleteEmployee}/>
                  </Suspense>
                )}
              />
            </Switch>
          </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
