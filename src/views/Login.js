import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router-dom';

import { loginUser } from '../actions/authActions';

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
} from 'reactstrap';

function Login({ isAuthenticated, loginUser }) {
  const history = useHistory();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const { state } = useLocation();

  const handleInputChange = (value, fieldName) => {
    setCredentials(prevState => ({ ...prevState, [fieldName]: value }));
  };

  const login = () => {
    if (!credentials.password && !credentials.email) return;
    loginUser(credentials);
    // history.push('/admin/dashboard');
  };

  if (isAuthenticated === true) {
    // console.log('state.from', state.from);
    return <Redirect to={state?.from || '/admin/maps'} />;
  }

  const register = () => {
    history.push('/register');
  };

  return (
    <div className='app flex-row align-items-center'>
      <Container>
        <Row className='justify-content-center'>
          <Col md='8'>
            <CardGroup>
              <Card className='p-4'>
                <CardBody>
                  <Form>
                    <h1>Login</h1>
                    <p className='text-muted'>Sign In to your account</p>

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
                    <Row>
                      <Col xs='6'>
                        <Button
                          color='primary'
                          className='px-4'
                          name='connectButton'
                          onClick={e => login(e)}
                        >
                          Login
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                  <p className='text-muted'>No account yet?</p>
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
  loginUser: credentials => dispatch(loginUser(credentials)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
