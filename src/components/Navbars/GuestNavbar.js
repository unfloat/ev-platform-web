/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Navbar, Container, Nav, Dropdown, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import { loginUser, registerUser } from '../../actions/authActions';

import routes from 'routes.js';

function GuestHeader() {
  const history = useHistory();
  const location = useLocation();
  // const mobileSidebarToggle = e => {
  //   e.preventDefault();
  //   document.documentElement.classList.toggle('nav-open');
  //   let node = document.createElement('div');
  //   node.id = 'bodyClick';
  //   node.onclick = function () {
  //     this.parentElement.removeChild(this);
  //     document.documentElement.classList.toggle('nav-open');
  //   };
  //   document.body.appendChild(node);
  // };

  const getBrandText = () => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return 'EV Charging';
  };

  const login = () => {
    loginUser();
    history.push('/guest/login');
  };

  const register = () => {
    registerUser();
    history.push('/guest/register');
  };
  const map = () => {
    history.push('/guest/map');
  };

  return (
    <Navbar bg='light' expand='lg'>
      <Container fluid>
        <div className='d-flex justify-content-center align-items-center ml-2 ml-lg-0'>
          {/* <Button
            variant='dark'
            className='d-lg-none btn-fill d-flex justify-content-center align-items-center rounded-circle p-2'
            onClick={mobileSidebarToggle}
          >
            <i className='fas fa-ellipsis-v' />
          </Button> */}
          <Navbar.Brand
            href='#home'
            onClick={e => e.preventDefault()}
            className='mr-2'
          >
            {getBrandText()}
          </Navbar.Brand>
        </div>
        <Navbar.Toggle aria-controls='basic-navbar-nav' className='mr-2'>
          <span className='navbar-toggler-bar burger-lines' />
          <span className='navbar-toggler-bar burger-lines' />
          <span className='navbar-toggler-bar burger-lines' />
        </Navbar.Toggle>
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='nav mr-auto' navbar>
            <Nav.Item>
              <Nav.Link
                data-toggle='dropdown'
                href='#pablo'
                onClick={e => e.preventDefault()}
                className='m-0'
              >
                <span className='d-lg-none ml-1'>Dashboard</span>
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Nav className='ml-auto' navbar>
            <Nav.Item>
              <Nav.Link className='m-0' onClick={map}>
                <span className='no-icon'>Carte</span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className='m-0' onClick={register}>
                <span className='no-icon'>S'inscrire</span>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link className='m-0' onClick={login}>
                <span className='no-icon'>S'identifier</span>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

const mapDispatchToProps = dispatch => ({
  loginUser: () => dispatch(loginUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GuestHeader);
