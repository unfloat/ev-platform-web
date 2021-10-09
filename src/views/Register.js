import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../actions/authActions';
import { Redirect } from 'react-router-dom';
import roles from './../constants/roles';
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
  FormGroup,
  FormControl,
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

  // const roles = [
  //   { name: 'CPO', value: 'CPO', label: 'Gérant(e) point de recharge' },
  //   { name: 'MSP', value: 'MSP', label: 'Conducteur véhicule électrique' },
  // ];

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
    return <Redirect to={'/admin/carte'} />;
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
                <Form onSubmit={() => history.push('/admin/carte')} />
                <Row>
                  <Col md='12'>
                    <Form.Group>
                      <label htmlFor='email'>Adresse e-mail</label>
                      <Form.Control
                        placeholder='E-mail'
                        type='email'
                        onChange={e =>
                          handleInputChange(e.target.value, e.target.name)
                        }
                        name='email'
                        value={credentials.email}
                      />
                      {/* 
      // TODO
<FormControl.Feedback type='invalid'>
                        Adresse mail invalide
                      </FormControl.Feedback> */}
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md='12'>
                    <Form.Group>
                      <label htmlFor='password'>Mot de passe</label>

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
                  <Col md='6'>
                    <Form.Group>
                      <label htmlFor='firstname'>Prénom</label>

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

                  <Col md='6'>
                    <Form.Group>
                      <label htmlFor='lastname'>Nom</label>

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
                <Row>
                  <Col md='6'>
                    <FormGroup>
                      <label>Ville</label>
                      <Form.Control
                        placeholder='Ville'
                        type='text'
                        name='city'
                        value={credentials.city}
                        onChange={e =>
                          handleInputChange(e.target.value, e.target.name)
                        }
                      />
                    </FormGroup>
                  </Col>
                  <Col md='6'>
                    <FormGroup>
                      <label>Code Postal</label>
                      <Form.Control
                        placeholder='Code Postal'
                        type='text'
                        name='postal_code'
                        value={credentials.postal_code}
                        onChange={e =>
                          handleInputChange(e.target.value, e.target.name)
                        }
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md='12'>
                    <FormGroup>
                      <label htmlFor='role'>Role</label>
                      {roles.map(role => (
                        <Col md='12'>
                          <Form.Check
                            key={role.id}
                            type='radio'
                            id={`role-${role.id}`}
                            label={role.label}
                            value={role.value}
                            name='role'
                            onChange={e => setRole(e.currentTarget.value)}
                          />
                        </Col>
                      ))}
                    </FormGroup>
                  </Col>
                </Row>
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
