import React from 'react';
import {
  RouteComponentProps,
  withRouter
} from "react-router-dom";
import EmployeeModel from '../../../models/employee';


interface IProps{
  employeeDetails: any;
  employeeList: EmployeeModel[];
}


class EmployeeDetailsView extends React.Component<IProps> {

  render() {
    console.log(this.props);
    return(
      <div>
      <h1>{this.props.employeeDetails.id}</h1>
      <h1>{this.props.employeeDetails.name}</h1>
      </div>
    )
  }
}

export default EmployeeDetailsView