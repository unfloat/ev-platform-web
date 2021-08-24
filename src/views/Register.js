import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../actions/authActions';
import { Redirect } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  Alert,
  Label,
} from 'reactstrap';

function Register({ isAuthenticated, registerUser }) {
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    role: 'MSP',
  });

  const handleInputChange = (value, fieldName) => {
    setCredentials(prevState => ({ ...prevState, [fieldName]: value }));
  };

  const register = () => {
    if (!credentials.email && !credentials.name && !credentials.password)
      return;
    registerUser(credentials);
  };
  // const { state } = useLocation();

  if (isAuthenticated === true) {
    return <Redirect to={'/admin/dashboard'} />;
  }

  return (
    <div className='app flex-row align-items-center'>
      <Container>
        <Row className='justify-content-center'>
          <Col md='8'>
            <CardGroup>
              <Card className='p-4'>
                <CardBody>
                  <Form afterSubmit={() => history.push('/admin/dashboard')} />
                  <h1>Sign Up</h1>
                  <p className='text-muted'>Create your account</p>

                  <InputGroup className='mb-3'>
                    <InputGroupAddon addonType='prepend'>
                      <InputGroupText>
                        <i className='icon-user' />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      onChange={e =>
                        handleInputChange(e.target.value, e.target.name)
                      }
                      type='text'
                      placeholder='Email'
                      autoComplete='email'
                      name='email'
                      value={credentials.email}
                    />
                  </InputGroup>
                  <InputGroup className='mb-3'>
                    <InputGroupAddon addonType='prepend'>
                      <InputGroupText>
                        <i className='icon-user' />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      onChange={e =>
                        handleInputChange(e.target.value, e.target.name)
                      }
                      type='text'
                      placeholder='Name'
                      autoComplete='name'
                      name='name'
                      value={credentials.name}
                    />
                  </InputGroup>
                  <InputGroup className='mb-4'>
                    <InputGroupAddon addonType='prepend'>
                      <InputGroupText>
                        <i className='icon-lock' />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      onChange={e =>
                        handleInputChange(e.target.value, e.target.name)
                      }
                      type='password'
                      placeholder='Password'
                      autoComplete='current-password'
                      name='password'
                      value={credentials.password}
                    />
                  </InputGroup>
                  <InputGroup className='mb-4'>
                    <Label check>
                      <Input
                        type='checkbox'
                        name='role'
                        onChange={e =>
                          handleInputChange(e.target.value, e.target.name)
                        }
                        value={credentials.role}
                      />
                      Je suis CPO
                    </Label>
                  </InputGroup>
                  <Row>
                    <Col xs='6'>
                      <Button
                        color='primary'
                        className='px-4'
                        name='connectButton'
                        onClick={register}
                      >
                        Sign up
                      </Button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </CardGroup>
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
