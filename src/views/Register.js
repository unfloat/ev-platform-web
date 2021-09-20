import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../actions/authActions';
import { Redirect } from 'react-router-dom';
// react-bootstrap components
import {
  ToggleButton,
  Button,
  Card,
  Form,
  ButtonGroup,
  Container,
  Row,
  Col,
} from 'react-bootstrap';

function Register({ isAuthenticated, registerUser }) {
  const [credentials, setCredentials] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    role: '',
  });
  const [role, setRole] = useState('');

  const roles = [
    { name: 'CPO', value: 'CPO' },
    { name: 'MSP', value: 'MSP' },
  ];

  const handleInputChange = (value, fieldName) => {
    setCredentials(prevState => ({ ...prevState, [fieldName]: value }));
  };

  const register = () => {
    if (
      !credentials.email &&
      !credentials.password &&
      !credentials.firstname &&
      !credentials.lastname
    )
      return;
    console.log('submitted role', role);
    credentials.role = role;
    registerUser(credentials);
  };

  if (isAuthenticated === true) {
    return <Redirect to={'/admin/dashboard'} />;
  }

  return (
    <div className='app flex-row align-items-center'>
      <Container>
        <Row className='justify-content-center'>
          <Col md='8'>
            <Card>
              <Card.Header>
                <Card.Title as='h4'>Inscription</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={() => history.push('/admin/dashboard')} />
                <Row>
                  <Col md='12'>
                    <Form.Group>
                      <Form.Control
                        placeholder='E-mail'
                        type='email'
                        onChange={e =>
                          handleInputChange(e.target.value, e.target.name)
                        }
                        name='email'
                        value={credentials.email}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md='12'>
                    <Form.Group>
                      <Form.Control
                        placeholder='Mot de passe'
                        type='password'
                        onChange={e =>
                          handleInputChange(e.target.value, e.target.name)
                        }
                        name='password'
                        value={credentials.password}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md='12'>
                    <Form.Group>
                      <Form.Control
                        type='text'
                        placeholder='Prénom'
                        autoComplete='name'
                        name='firstname'
                        value={credentials.firstname}
                        onChange={e =>
                          handleInputChange(e.target.value, e.target.name)
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md='12'>
                    <Form.Group>
                      <Form.Control
                        type='text'
                        placeholder='Nom'
                        autoComplete='name'
                        name='lastname'
                        value={credentials.lastname}
                        onChange={e =>
                          handleInputChange(e.target.value, e.target.name)
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <ButtonGroup>
                  {roles.map((role, idx) => (
                    <ToggleButton
                      key={idx}
                      id={`role-${idx}`}
                      type='radio'
                      name='role'
                      value={role.value}
                      onChange={e => setRole(e.currentTarget.value)}
                    >
                      {role.name}
                    </ToggleButton>
                  ))}
                </ButtonGroup>
                <Row>
                  <Col xs='6'>
                    <Button
                      color='primary'
                      className='px-4'
                      name='connectButton'
                      onClick={register}
                    >
                      S'inscrire
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  errors: state.errors,
});

const mapDispatchToProps = dispatch => ({
  registerUser: credentials => dispatch(registerUser(credentials)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
