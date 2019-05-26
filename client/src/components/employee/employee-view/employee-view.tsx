import React from 'react';
import {
  RouteComponentProps,
  withRouter,
  Redirect
} from "react-router-dom";
import { Button } from "react-bootstrap";
import './employee-view.css';
import Header from '../header/header';

interface MatchParams {
  employeeId: string;
}

interface IProps extends RouteComponentProps<MatchParams> {
}

interface IState {
  redirect: boolean,
  employee: any,
  employeeEditing: boolean
}


class EmployeeView extends React.Component<IProps, IState> {

  constructor(props: any) {
    super(props);
    this.state = {
      redirect: false,
      employeeEditing: false,
      employee: ''
    }
  }

  async componentDidMount() {

    fetch('http://localhost:9000/getEmployeeDetails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: this.props.match.params.employeeId }),
    }).then(response => response.json())
      .then(body => {
        console.log(body);
        if (body.error == 'No such document') {
          console.log("No Data Found");
          // No data found, so redirecting to the landing page
          this.setState({ redirect: true });
        } else {
          this.setState({ employee: body });
        }
      });
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/' />
    }
  }
  onEditButtonPress = () => {
    this.setState({ employeeEditing: true })
  }
  handleObjectChange(e: any) {
    let target = e.target;
    let value = target.value;
    let name = target.name;
    this.setState({
      employee: { ...this.state.employee, [name]: value }
    });
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

  render() {
    if (sessionStorage.getItem('employeeLoginId') == null) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <Header/>
      <div className="container">
        {this.renderRedirect()}
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
              {this.state.employee.id}
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
        
        <b> List of Reviews Part WIP</b>
      </div>
      </div>
    )
  }
}

export default withRouter(EmployeeView)