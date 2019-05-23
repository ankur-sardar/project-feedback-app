import React, { Component, Suspense } from 'react';
import './App.css';
import 'antd/dist/antd.css';

import LandingPage from './components/landing-page';
import {
  Route,
  Switch,
  BrowserRouter,
} from "react-router-dom";

const EmployeePage = React.lazy(() => import('./components/employee/employee'));
const AdminPage = React.lazy(() => import('./components/admin/admin'));
const EmployeeListView = React.lazy(() => import('./components/admin/employee-list-view/employee-list-view'));


class App extends Component {
  render() {
    return (
      <BrowserRouter>
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
                  <EmployeeListView />
                </Suspense>
              )}
            />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    )
  }
}

export default App;
