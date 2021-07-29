import React, {  useState } from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../actions/authActions'
import { useHistory } from "react-router-dom";

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
  Label
} from 'reactstrap'

function Login({ message, visible, loginUser }) {
  const history = useHistory();

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  })

  const handleInputChange = (value, fieldName) => {
    setCredentials(prevState => ({ ...prevState, [fieldName]: value }))
  }

  const login = () => {
    if (!credentials.password && !credentials.email) return;
    loginUser(credentials);
    history.push("/admin/dashboard");
  }

  const register = () => {
    history.push("/admin/register");
  }

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
                        onChange={(e) => handleInputChange(e.target.value, e.target.name)}
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
                        onChange={(e) => handleInputChange(e.target.value, e.target.name)}
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
                          onClick={login}
                        >
                          Login
                        </Button>
                      </Col>
                    </Row>
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
                  </Form>
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </div>
  )
}


const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

const mapDispatchToProps = dispatch => ({
  loginUser: (credentials) => dispatch(loginUser(credentials))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
