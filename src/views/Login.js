import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router-dom';

import { loginUser } from '../actions/authActions';

import {
  Button,
  Card,
  Form,
  CardGroup,
  Container,
  Row,
  Col,
} from 'react-bootstrap';

function Login({ isAuthenticated, loginUser, user }) {
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
    return <Redirect to={state?.from || '/admin/carte'} />;
  }

  const register = () => {
    history.push('/guest/register');
  };

  return (
    <div className='app flex-row align-items-center'>
      <Container>
        <Row className='justify-content-center'>
          <Col md='8'>
            <Card>
              <Card.Header>
                <Card.Title as='h4'>Authentification</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group className='mb-3'>
                    <label htmlFor='email'>Adresse e-mail</label>

                    <Form.Control
                      onChange={e =>
                        handleInputChange(e.target.value, e.target.name)
                      }
                      type='text'
                      placeholder='E-mail'
                      autoComplete='email'
                      name='email'
                      value={credentials.email}
                    />
                  </Form.Group>
                  <Form.Group className='mb-4'>
                    <label htmlFor='password'>Mot de passe</label>
                    <Form.Control
                      onChange={e =>
                        handleInputChange(e.target.value, e.target.name)
                      }
                      type='password'
                      placeholder='Mot de passe'
                      autoComplete='current-password'
                      name='password'
                      value={credentials.password}
                    />
                  </Form.Group>
                  <Row>
                    <Col xs='6'>
                      <Button
                        color='primary'
                        className='px-4'
                        name='connectButton'
                        onClick={e => login(e)}
                      >
                        Se connecter
                      </Button>
                    </Col>
                  </Row>
                </Form>
                <br />
                <p className='text-muted'>Ou créer un compte</p>
                <Row>
                  <Col xs='6'>
                    <Button
                      color='primary'
                      className='px-4'
                      name='connectButton'
                      onClick={register}
                    >
                      Inscription
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
  user: state.auth.user,
  errors: state.errors,
});

const mapDispatchToProps = dispatch => ({
  loginUser: credentials => dispatch(loginUser(credentials)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
