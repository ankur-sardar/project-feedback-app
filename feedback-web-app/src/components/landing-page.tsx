import React, { Component } from 'react';
import { Button } from 'antd';
import './landing-page.css';
import {
  RouteComponentProps
} from "react-router-dom";

class LandingPage extends Component<RouteComponentProps>{

  onAdminPressed = () => {
    this.props.history.push("/admin");
  };

  onEmployeePressed = () => {
    this.props.history.push("/employee");
  };

  render() {
    console.log(this.props);
    return (
      <div className="landingPage">
        <Button className="landingPageButton" type="primary" block onClick={this.onAdminPressed}>
          Enter As an Admin
        </Button>
        <Button className="landingPageButton" block onClick={this.onEmployeePressed}>
          Enter as an Employee
        </Button>
      </div>
    )
  }
}

export default LandingPage;