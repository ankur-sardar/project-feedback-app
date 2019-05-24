import React from 'react';
import './employee-list-view.css';
import { Button, Modal } from 'antd';
import Header from '../header/header';
import { Form } from 'react-bootstrap';

import Employee from '../../../models/employee';

interface IProps {
  employeeList: Employee[],
  handleSubmit: (value: string) => void,
  removeEmployee: (id: number) => void
}


interface IState {
  modalVisible: boolean;
  apiResponse: Array<string>;
  employeeName: string;
}

class EmployeeListView extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      modalVisible: false,
      apiResponse: [],
      employeeName: ''
    };
  }
  showModal = () => {
    this.setState({
      modalVisible: true,
    });
  };
  handleOk = (e: any) => {
    console.log(this.state);
    console.log(this.props);
    this.props.handleSubmit(this.state.employeeName);
    this.setState({
      modalVisible: false,
      employeeName: ''
    });

  };

  handleCancel = (e: any) => {
    console.log(e);
    this.setState({
      modalVisible: false,
    });
  };
  callAPI = () => {
    fetch('http://localhost:9000/testAPI')
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: JSON.parse(res) }));
  }

  handleInputChange = (event: any) => {
    const target = event.target;
    const value = target.value;
    console.log(value);
    this.setState({
      employeeName: value
    });
    // console.log(this.state.company);
  }

  handleRemoveEmployee = (id: number) => {
    console.log('Removing: ' + id);
    this.props.removeEmployee(id);
  }

  componentDidMount() {
    this.callAPI();
  }

  render() {
    console.log(this.props.employeeList);
    return (
      <div>
        <Header />
        <div className="employeeListContainer">
          <div className="row">
            <h1 className="employeeListSubheader">Employee List</h1>
            <Button onClick={this.showModal} className="addEmployee">
              Add New Employee
            </Button>
          </div>
          <br />
          <div>
            <div className="border">
              <table className="table table-hover table-table-bordered">
                <thead>
                  <tr>
                    <th scope="col" >
                      <a className="shortlistTableName">Name</a>
                    </th>
                    <th scope="col">Employee Id</th>
                    <th scope="col">Options</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.employeeList.length > 0 ? this.props.employeeList.map((employee: any, index: any) =>
                    (
                      <tr key={index}>
                        <td className="tdCandidateName">
                          <div className="profileCard">
                            <div className="profileCard-profileImage">
                            </div>
                            <div className="profileCard-details">
                              <div className="profileCard-details__name">
                                <a>{employee.name}</a>
                              </div>

                            </div>
                          </div>
                        </td>
                        <td className="tdCandidateJobTitle">
                          <div className="shortListedJobProfile">
                            <strong>{employee.id}</strong>

                          </div>
                        </td>
                        <td className="tdCandidateShortlisted">
                          <button className="btn btn-outline-danger shortListedAction" onClick={() => this.handleRemoveEmployee(employee.id)} >
                            Remove
                          </button>

                          <button className="btn btn-info viewDetails" >
                            <div className="row shortlistButton">
                              <span className="col">
                                View Profile
                                      </span>
                            </div>
                          </button>
                        </td>
                      </tr>
                    )) : 
                    <h1 className="noData">No Data Found</h1>
                    }
                </tbody>
              </table>
            </div>
            <Modal
              title="Add New Employee"
              centered
              visible={this.state.modalVisible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              <div>
                <Form>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Employee Name</Form.Label>
                    <Form.Control type="text" value={this.state.employeeName} name="employeeName" id="employeeName" placeholder="Enter Employee Name" onChange={this.handleInputChange} />
                    <Form.Text className="text-muted">
                      We'll auto-generate the employee id, Please use employee id to login as employee
                    </Form.Text>
                  </Form.Group>
                  {/* <Form.Group controlId="formBasicEmail">
                    <Form.Label>Employee Id</Form.Label>
                    <Form.Control type="text" name="employeeId" id="employeeId" placeholder="Enter Employee Id" onChange={this.handleInputChange} />
                    <Form.Text className="text-muted">
                      Employee Id will be the username for the employees
                    </Form.Text>
                  </Form.Group> */}
                </Form>
              </div>
            </Modal>
          </div>
          <br />
        </div>
      </div>
    )
  }
}

export default EmployeeListView;