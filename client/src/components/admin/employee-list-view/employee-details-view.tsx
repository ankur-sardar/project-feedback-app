import React from 'react';
import {
  RouteComponentProps,
  withRouter
} from "react-router-dom";
import EmployeeModel from '../../../models/employee';
import { http } from "../../../services/employee-service";
import { Button } from "react-bootstrap";
import AutoSuggest from "../auto-complete/auto-suggest";

interface IProps {
  employeeDetails: any;
  employeeList: EmployeeModel[];
}

interface IState {
  employee: any;
  employeeEditing: boolean;

}


class EmployeeDetailsView extends React.Component<IProps, IState> {

  constructor(props: any) {
    super(props);
    this.state = {
      employee: '',
      employeeEditing: false
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

  handleObjectChange(e: any) {
    let target = e.target;
    let value = target.value;
    let name = target.name;
    this.setState({
      employee: { ...this.state.employee, [name]: value }
    });
  }

  onEditButtonPress = () => {
    this.setState({ employeeEditing: true })
  }

  onSaveButtonPress = () => {
    fetch('http://localhost:9000/updateEmployeeAPI', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: this.state.employee.id, name: this.state.employee.name, reviewRequestedForEmployeesList: this.state.employee.reviewRequestedForEmployeesList })
    });
    this.setState({ employeeEditing: false })
  }

  handleAssignReviewTask = (value: any) => {
    console.log(value);
    this.setState({
      employee: { ...this.state.employee, reviewRequestedForEmployeesList: value }
    });
  }

  render() {
    return (
      <div>
        {this.state.employeeEditing ?
          <Button variant="outline-success" onClick={this.onSaveButtonPress}>Save</Button>
          :
          <Button variant="outline-primary" onClick={this.onEditButtonPress}>Edit</Button>
        }
        <br />
        <div className="row">
          <label
            className="control-label col-lg-3 "
            htmlFor=""
          >
            Employee Id:
          </label>
          <div className="col-lg-9 ">
            <span>
              {this.props.employeeDetails.id}
            </span>
          </div>
        </div>
        {this.state.employeeEditing ?
          <div>
            <label>
              <small>
                <strong>Employee Name:</strong>
              </small>
            </label>
            <input
              type="text"
              onChange={e => this.handleObjectChange(e)}
              className="form-control"
              name="name"
              id="name"
              placeholder="Example: John Doe"
              value={this.state.employee.name}
            />
          </div>
          :
          <div className="row">
            <label
              className="control-label col-lg-3 "
              htmlFor=""
            >
              Employee Name:
          </label>
            <div className="col-lg-9 ">
              <span>
                {this.state.employee.name}
              </span>
            </div>
          </div>
        }

        {this.state.employeeEditing ?
          <div>
            <label>
              Review Assigned To:
            </label>

            <AutoSuggest
              handleChange={this.handleAssignReviewTask}
              options={this.props.employeeList.filter((item: any) => { return item.id !== this.props.employeeDetails.id })}
              isMulti={true}
              creatable={false}
              defaultValue={
                this.state.employee.reviewRequestedForEmployeesList
                  ? this.state.employee.reviewRequestedForEmployeesList
                  : ""
              }
            />
          </div>
          :
          <div className="row">
            <label
              className="control-label col-lg-3 socialInfolbl"
              htmlFor=""
            >
              Assigned to Review:
            </label>
            <div
              className="col-lg-9 socialInfolbl"
              id=""
            >
              {this.state.employee.reviewRequestedForEmployeesList ? (
                this.state.employee.reviewRequestedForEmployeesList.map(
                  (employee: any) => (
                    <p
                      key={employee.id}
                      className="tag"
                    >
                      {employee.name
                        ? employee.name
                        : employee.name}
                    </p>
                  )
                )
              ) : (
                  <span className="">
                    | click edit and assign employee to be review by this employee|
                  </span>
                )}
            </div>
          </div>
        }

        <b> List of Reviews Part WIP</b>
      </div>
    )
  }
}

export default EmployeeDetailsView