import React from 'react';
import { Navbar, Nav, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";

import './header.css';
const logout = () => {
  sessionStorage.removeItem("adminLoginId");
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
                    src='https://firebasestorage.googleapis.com/v0/b/onetrowebapiservice.appspot.com/o/CompanyLogo%2Foffice-logo.png?alt=media&token=3794b07e-b8d9-498e-88db-9d57ab2843cc'
                    alt="office"
                  />
                </div>
                <div className="row">
                  <h3 className="forStyle">Admin Panel</h3>
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