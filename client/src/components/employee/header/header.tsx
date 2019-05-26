import React from 'react';
import { Navbar, Nav, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";

import './header.css';
const logout = () => {
  sessionStorage.removeItem("employeeLoginId");
  return <Redirect to="/" />;
}
const Header = () => {
  return (
     <div>
          <Navbar collapseOnSelect expand="sm" className="navBar" sticky="top">
            <Navbar.Brand href="#home">
              <div className="col topBar">
                <div className="row left topLogo">
                  <img
                    className="media-object img-circle companyLogo"
                    src='https://firebasestorage.googleapis.com/v0/b/onetro-company.appspot.com/o/ProfilePicture%2Favatar_man.png?alt=media&token=961e9121-51b5-48d6-a364-a9a509d47491'
                    alt="office"
                  />
                </div>
                <div className="row">
                  <h3 className="forStyle">Employee Panel</h3>
                </div>
              </div>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="#home" />
              </Nav>
              <Nav>
                <Nav.Link href="/admin">
                  <Button  id="bak1Head" onClick={logout}>
                    Logout
                </Button>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
  )
}

export default Header;