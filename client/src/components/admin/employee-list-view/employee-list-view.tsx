import React from 'react';
import './employee-list-view.css';
import Header from '../header/header';
import { Form, Button, Modal } from 'react-bootstrap';
import EmployeeModel from '../../../models/employee';
import { Redirect } from "react-router-dom";
import EmployeeDetailsView from "./employee-details-view";


interface IProps {
  employeeList: EmployeeModel[],
  handleSubmit: (name: string, id: number) => void,
  removeEmployee: (id: number) => void
}

interface IState {
  addEmployeeModalVisible: boolean;
  employeeModalVisible: boolean;
  apiResponse: Array<string>;
  employeeName: string;
  employeeId: any;
  validated: boolean;
  selectedEmployeeDetails: any;
}

class EmployeeListView extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      addEmployeeModalVisible: false,
      employeeModalVisible: false,
      apiResponse: [],
      employeeName: '',
      employeeId: '',
      validated: false,
      selectedEmployeeDetails: ''
    };
  }
  showAddEmployeeModal = () => {
    this.setState({
      addEmployeeModalVisible: true,
    });
  };
  showEmployeeDetailsModal = ( employee: any) => {
    console.log('Showing details');
    this.setState({
      selectedEmployeeDetails: employee,
      employeeModalVisible: true
    })
  }
  closeEmployeeDetailsModal = () => {
    this.setState({
      employeeModalVisible: false
    })
  }
  handleOk = (event: any) => {
    event.preventDefault();
    console.log(this.props.employeeList);
    console.log(this.props.employeeList.find(this.checkExistingEmployeeId));

    const form = event.currentTarget;
    if (form.checkValidity() === false || this.props.employeeList.find(this.checkExistingEmployeeId)) {
      event.stopPropagation();
      this.setState({
        employeeId: ''
      });
    } else {
      console.log('Success');
      this.props.handleSubmit(this.state.employeeName, this.state.employeeId);
      this.setState({
        addEmployeeModalVisible: false,
        employeeName: '',
        employeeId: ''
      });
    }
    this.setState({ validated: true });
  };

  checkExistingEmployeeId = (item: EmployeeModel) => {
    return item.id === this.state.employeeId;
  }
  handleCancel = () => {
    this.setState({
      addEmployeeModalVisible: false,
    });
  };

  handleInputChange = (event: any) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log(name);
    if (name === 'employeeName') {
      this.setState({
        employeeName: value
      });
    } else if (name === 'employeeId') {
      this.setState({
        employeeId: value
      });
    }
  }

  handleRemoveEmployee = (id: number) => {
    console.log('Removing: ' + id);
    this.props.removeEmployee(id);
  }

  componentDidMount() {
    // this.callAPI();
  }

  render() {
    if (sessionStorage.getItem('adminLoginId')==null) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <Header />
        <div className="employeeListContainer">
          <div className="row">
            <h1 className="employeeListSubheader">Employee List</h1>
            <Button onClick={this.showAddEmployeeModal} className="addEmployee">
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

                          <Button className="btn" onClick={() => this.showEmployeeDetailsModal(employee)}>
                            <div className="row shortlistButton">
                              <span className="col">
                                View Profile
                              </span>
                            </div>
                          </Button>
                        </td>
                      </tr>
                    )) :
                    <h1 className="noData">No Data Found</h1>
                  }
                </tbody>
              </table>
            </div>
            <Modal
              show={this.state.addEmployeeModalVisible}
              onHide={this.handleCancel}
            >
              <Modal.Header closeButton>
                <Modal.Title>Add New Employee</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <div>
                <Form noValidate validated={this.state.validated} onSubmit={(e: any) => this.handleOk(e)}>
                  <Form.Group controlId="employeeName">
                    <Form.Label>Employee Name</Form.Label>
                    <Form.Control required type="text" value={this.state.employeeName} name="employeeName" placeholder="Enter Employee Name" onChange={this.handleInputChange} />
                    <Form.Control.Feedback type="invalid">
                      Please choose a Name
                    </Form.Control.Feedback>
                    <Form.Text className="text-muted">
                      We'll auto-generate the employee id, Please use employee id to login as employee
                    </Form.Text>
                  </Form.Group>
                  <Form.Group controlId="employeeId">
                    <Form.Label>Employee Id</Form.Label>
                    <Form.Control required type="number" value={this.state.employeeId.toString()} name="employeeId" placeholder="Enter Employee Id" onChange={this.handleInputChange} />
                    <Form.Control.Feedback type="invalid">
                      The Employee Id is already taken or Please enter a valid Employee Id number
                    </Form.Control.Feedback>
                    <Form.Text className="text-muted">
                      Employee Id will be the username for the employees
                    </Form.Text>
                  </Form.Group>
                  <Button type="submit">Submit</Button>
                </Form>
              </div>
              </Modal.Body>
            </Modal>
            <Modal show={this.state.employeeModalVisible} onHide={this.closeEmployeeDetailsModal}>
            <Modal.Header closeButton>
                <Modal.Title>Employee Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <EmployeeDetailsView employeeDetails= {this.state.selectedEmployeeDetails} employeeList= {this.props.employeeList}/>
                </Modal.Body>
            </Modal>
          </div>

          <br />
        </div>
      </div>
    )
  }
}

export default EmployeeListView;