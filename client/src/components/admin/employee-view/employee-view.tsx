import React from 'react';
import {
  RouteComponentProps,
  withRouter
} from "react-router-dom";

interface MatchParams {
  employeeId: string;
}

interface IProps extends RouteComponentProps<MatchParams> {
}


class EmployeeView extends React.Component<IProps> {

  render() {
    console.log(this.props);
    return(
      <div>
      <h1>{this.props.match.params.employeeId}</h1>
      </div>
    )
  }
}

export default withRouter(EmployeeView)