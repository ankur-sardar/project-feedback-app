import React from 'react';
import './employee-list-view.css';
import { Button, Modal } from 'antd';
import Header from '../header/header';

interface IProps {

}


interface IState {
  modalVisible: boolean;
  apiResponse: any;
}

class EmployeeListView extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      modalVisible: false,
      apiResponse: []
    };
  }
  showModal = () => {
    this.setState({
      modalVisible: true,
    });
  };
  handleOk = (e: any) => {
    console.log(e);
    this.setState({
      modalVisible: false,
    });
  };

  handleCancel = (e: any) => {
    console.log(e);
    this.setState({
      modalVisible: false,
    });
  };
  callAPI() {
    fetch('http://localhost:9000/testAPI')
        .then(res => res.text())
        .then(res => this.setState({ apiResponse: res }));
}

  componentDidMount() {
    this.callAPI();
  }

  

  render() {
    return (
      <div>
        <Header />
        <div className="employeeListContainer">
          <div className="row">
            <h1 className="employeeListSubheader">Employee List</h1>
            <Button onClick={this.showModal} className="addEmployee">
              Add New Employee
        </Button>
            <h1>{this.state.apiResponse}</h1>
            <h1>{this.state.apiResponse}</h1>
            <Modal
              title="Add New Employee"
              centered
              visible={this.state.modalVisible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>
            </Modal>
          </div>
          <br />
        </div>
      </div>
    )
  }
}

export default EmployeeListView;