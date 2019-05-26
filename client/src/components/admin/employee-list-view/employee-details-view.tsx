import React from 'react';
import {
  RouteComponentProps,
  withRouter
} from "react-router-dom";
import EmployeeModel from '../../../models/employee';
import { http } from "../../../services/employee-service";


interface IProps {
  employeeDetails: any;
  employeeList: EmployeeModel[];
}

interface IState {
  employee: any;
}


class EmployeeDetailsView extends React.Component<IProps, IState> {

  constructor(props: any) {
    super(props);
    this.state = {
      employee: ''
    }
  }

  async componentDidMount() {
    fetch('http://localhost:9000/getEmployeeDetails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: this.props.employeeDetails.id }),
    }).then(response => response.json())
      .then(body => {
        console.log(body);
        this.setState({ employee: body });
      });
  }

  render() {
    return (
      <div>
        <h1>{this.props.employeeDetails.id}</h1>
        <h1>{this.props.employeeDetails.name}</h1>
        <h1>{this.state.employee.name ? this.state.employee.name : 'No Details Found'}</h1>
      </div>
    )
  }
}

export default EmployeeDetailsView