import React, { useState } from 'react';
import { updateProfile } from '../actions/authActions';
import { connect } from 'react-redux';

import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from 'react-bootstrap';

function User({ user }) {
  const initialValues = {
    email: '',
    firstname: '',
    lastname: '',
    address: '',
    city: '',
    country: '',
    about: '',
  };
  const [profileProperties, setprofileProperties] = useState(initialValues);

  // const roles = [
  //   { name: 'CPO', value: 'CPO' },
  //   { name: 'MSP', value: 'MSP' },
  // ];

  const handleInputChange = (value, fieldName) => {
    setprofileProperties(prevState => ({ ...prevState, [fieldName]: value }));
    console.log(profileProperties);
  };

  const _updateProfile = _user => {
    // !Profile.email && !Profile.password &&
    console.log('profileProperties', { ...profileProperties, user: _user });

    updateProfile(profileProperties, _user);
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md='8'>
            <Card>
              <Card.Header>
                <Card.Title as='h4'>Modifier profil</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col md='12'>
                      <Form.Group>
                        <label htmlFor='exampleInputEmail1'>E-mail</label>
                        <Form.Control
                          placeholder={user.email}
                          disabled
                          type='email'
                          name='email'
                          onChange={e =>
                            handleInputChange(e.target.value, e.target.name)
                          }
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className='pr-1' md='6'>
                      <Form.Group>
                        <label>Prénom</label>
                        <Form.Control
                          placeholder={user.firstname}
                          type='text'
                          name='firstname'
                          onChange={e =>
                            handleInputChange(e.target.value, e.target.name)
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col className='pl-1' md='6'>
                      <Form.Group>
                        <label>Nom</label>
                        <Form.Control
                          placeholder={user.lastname}
                          type='text'
                          name='lastname'
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
                        <label>Addresse</label>
                        <Form.Control
                          placeholder={user.adress}
                          type='text'
                          name='adress'
                          onChange={e =>
                            handleInputChange(e.target.value, e.target.name)
                          }
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className='pr-1' md='6'>
                      <Form.Group>
                        <label>Ville</label>
                        <Form.Control
                          placeholder={user.city}
                          type='text'
                          name='city'
                          onChange={e =>
                            handleInputChange(e.target.value, e.target.name)
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col className='px-1' md='6'>
                      <Form.Group>
                        <label>Pays</label>
                        <Form.Control
                          placeholder={user.country}
                          type='text'
                          name='country'
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
                        <label>A propos de moi</label>
                        <Form.Control
                          cols='80'
                          placeholder={user.about}
                          rows='4'
                          as='textarea'
                          name='about'
                          onChange={e =>
                            handleInputChange(e.target.value, e.target.name)
                          }
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className='clearfix' />
                  <Button
                    className='btn-fill pull-right'
                    type='submit'
                    onClick={_updateProfile(user)}
                  >
                    Enregistrer
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md='4'>
            <Card className='card-user'>
              <div className='card-image'>
                <img
                  alt='...'
                  src={
                    require('assets/img/photo-1431578500526-4d9613015464.jpeg')
                      .default
                  }
                />
              </div>
              <Card.Body>
                <div className='author'>
                  <a href='#pablo' onClick={e => e.preventDefault()}>
                    <img
                      alt='...'
                      className='avatar border-gray'
                      src={require('assets/img/default-avatar.png').default}
                    />
                    <h3 className='title'>
                      {user.firstname} {user.lastname}
                    </h3>
                  </a>
                </div>
                <p className='description text-center'>Role: {user.role}</p>
              </Card.Body>
              <hr />
              <div className='button-container mr-auto ml-auto'>
                <Button
                  className='btn-simple btn-icon'
                  href='#pablo'
                  onClick={e => e.preventDefault()}
                  variant='link'
                >
                  <i className='fab fa-facebook-square' />
                </Button>
                <Button
                  className='btn-simple btn-icon'
                  href='#pablo'
                  onClick={e => e.preventDefault()}
                  variant='link'
                >
                  <i className='fab fa-twitter' />
                </Button>
                <Button
                  className='btn-simple btn-icon'
                  href='#pablo'
                  onClick={e => e.preventDefault()}
                  variant='link'
                >
                  <i className='fab fa-google-plus-square' />
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
  updateProfile: profileProperties =>
    dispatch(updateProfile(profileProperties)),
});
export default connect(mapStateToProps, mapDispatchToProps)(User);
