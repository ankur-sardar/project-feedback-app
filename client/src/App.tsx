import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import {State} from './reducers/reducer'
import {addEmployee, deleteEmployee, getEmployeeListApi} from './actions/action';
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
  addEmployee: (name: string, id: number) => void;
  deleteEmployee: (id: number) => void;
  callGetEmployeeListApi: () => void;
}
interface IState {
}

const mapStateToProps = (state: State) => ({
  employeeList: getEmployeeList(state)
  // employeeList: await getEmployeeListApi()
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addEmployee: (name:string, id: number) => dispatch(addEmployee(name, id)),
  deleteEmployee: (id:number) => dispatch(deleteEmployee(id)),
  callGetEmployeeListApi: async () => dispatch<any>(await getEmployeeListApi()),
})


const EmployeePage = React.lazy(() => import('./components/employee/employee'));
const AdminPage = React.lazy(() => import('./components/admin/admin'));
const EmployeeListView = React.lazy(() => import('./components/admin/employee-list-view/employee-list-view'));
const EmployeeView = React.lazy(() => import('./components/admin/employee-view/employee-view'));


export class App extends React.Component<IProps & IDispProps, IState>  {

  componentWillMount(){
    this.props.callGetEmployeeListApi();
  }

  render() {
    return (
          <React.Fragment>
            <Switch>
              <Route exact path="/" component={LandingPage} />
              {/* <Route
                exact
                path="/admin"
                render={() => (
                  <Suspense fallback={<div>Loading...</div>}>
                    <AdminPage />
                  </Suspense>
                )}
              /> */}
              <Route exact
                path="/employee"
                render={() => (
                  <Suspense fallback={<div>Loading...</div>}>
                    <EmployeePage />
                  </Suspense>
                )}
              />
              <Route exact
                path="/admin"
                render={() => (
                  <Suspense fallback={<div>Loading...</div>}>
                    <EmployeeListView employeeList={this.props.employeeList} handleSubmit={this.props.addEmployee} removeEmployee={this.props.deleteEmployee}/>
                  </Suspense>
                )}
              />
              <Route exact
                path="/employee/:employeeId"
                render={() => (
                  <Suspense fallback={<div>Loading...</div>}>
                    <EmployeeView />
                  </Suspense>
                )}
              />
            </Switch>
          </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
