import React, { Component } from 'react';
import './admin.css';
import { Card } from 'antd';
import {
  RouteComponentProps,
  withRouter
} from "react-router-dom";

import Header from './header/header';

class AdminPage extends Component<RouteComponentProps> {
  onEmployeeListPressed = () => {
    this.props.history.push("/admin/employee-list");
  };

  render() {
    console.log(this.props)

    return (
      <div>
        <Header/>
        <div style={{ padding: '30px' }} className="row">
          <Card onClick={this.onEmployeeListPressed} title="Employee" style={{ margin: '30px' }} bordered={true} className="col adminFunctions">
            Show employee list
            </Card>
          <Card title="Performance Reviews" style={{ margin: '30px' }} bordered={true} className="col adminFunctions">
            Show given performance reviews
            </Card>
          <Card title="Assign Feedbacks" style={{ margin: '30px' }} bordered={true} className="col adminFunctions">
            Assign employee to participate in another employee's performance review
            </Card>
        </div>
      </div>
    )
  }
}

export default withRouter(AdminPage);