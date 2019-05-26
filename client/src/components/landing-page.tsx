import React, { Component } from 'react';
// import { Button, Modal } from 'antd';
import './landing-page.css';
import {
  RouteComponentProps
} from "react-router-dom";
import { Modal, Button, Form } from 'react-bootstrap';

interface IProps {

}
interface IState {
  adminLoginModalVisible: boolean;
  employeeLoginModalVisible: boolean;
  adminId: string;
  employeeId: string;
}
class LandingPage extends Component<IProps & RouteComponentProps, IState>{

  constructor(props: any) {
    super(props);
    this.state = {
      adminLoginModalVisible: false,
      employeeLoginModalVisible: false,
      adminId: '',
      employeeId: ''
    }
  }

  onAdminPressed = () => {
    // this.props.history.push("/admin/employee-list");
    this.setState({ adminLoginModalVisible: true });
  };

  onEmployeePressed = () => {
    // this.props.history.push("/employee");
    this.setState({ employeeLoginModalVisible: true });
  };

  handleAdminLogin = () => {
    this.props.history.push("/admin");
  }

  handleCloseAdminLogin = () => {
    this.setState({ adminLoginModalVisible: false });
  }

  handleCloseEmployeeLogin = () => {
    this.setState({employeeLoginModalVisible: false});
  }
  handleSubmitAdminLogin = (e: any) => {
    e.preventDefault();
    if(this.state.adminId === 'admin') {
      sessionStorage.setItem("adminLoginId", "admin");
      this.handleAdminLogin();
    }
  }

  handleSubmitEmployeeLogin = (e: any) => {
    e.preventDefault();
    sessionStorage.setItem("employeeLoginId", this.state.employeeId);
    this.props.history.push("/employee/" + this.state.employeeId);
  }

  handleInputChange = (event: any) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log(name);
    if (name === 'adminLoginId') {
      this.setState({
        adminId: value
      });
    } else if (name === 'employeeLoginId') {
      this.setState({
        employeeId: value
      });
    }
  }

  render() {
    return (
      <div className="landingPage">
        <Button className="landingPageButton" variant="primary" block onClick={this.onAdminPressed}>
          Enter As an Admin
        </Button>
        <Button className="landingPageButton" block onClick={this.onEmployeePressed}>
          Enter as an Employee
        </Button>
        <Modal show={this.state.adminLoginModalVisible} onHide={this.handleCloseAdminLogin} onSubmit={(e: any) => this.handleSubmitAdminLogin(e)}>
          <Modal.Dialog>
            <Modal.Header closeButton>
              <Modal.Title>Admin Login</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Admin UserID</Form.Label>
                  <Form.Control type="text" placeholder="** Hint: admin" name="adminLoginId" value={this.state.adminId} onChange={this.handleInputChange}/>
                  <Form.Text className="text-muted">
                    For testing the id is "admin"
                  </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                Login
                </Button>
              </Form>
            </Modal.Body>
          </Modal.Dialog>
        </Modal>

        <Modal show={this.state.employeeLoginModalVisible} onHide={this.handleCloseEmployeeLogin} onSubmit={(e: any) => this.handleSubmitEmployeeLogin(e)}>
          <Modal.Dialog>
            <Modal.Header closeButton>
              <Modal.Title>Employee Login</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Employee Id</Form.Label>
                  <Form.Control type="text" placeholder="Enter Employee Id" name="employeeLoginId" value={this.state.employeeId} onChange={this.handleInputChange}/>
                  <Form.Text className="text-muted">
                    Enter Employee Id
                  </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                  Login
                </Button>
              </Form>
            </Modal.Body>
          </Modal.Dialog>
        </Modal>


      </div>
    )
  }
}

export default LandingPage;