import React, { useState } from 'react';
import { updateProfile } from '../actions/authActions';
import { connect } from 'react-redux';

import { Button, Card, Form, Container, Row, Col } from 'react-bootstrap';

function User({
  user,
  updateProfile,
  hasImage,
  setHasImage,
  color,
  setColor,
  image,
  setImage,
}) {
  const initialValues = {
    firstname: user.firstname,
    lastname: user.lastname,
    address: '',
    city: '',
    country: '',
    about: '',
    website_url: '',
    phone: '',
  };
  const [profileProperties, setprofileProperties] = useState(initialValues);
  const handleInputChange = (value, fieldName) => {
    setprofileProperties(prevState => ({ ...prevState, [fieldName]: value }));
  };

  const _updateProfile = _user => {
    updateProfile(profileProperties, _user.id);
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
                          placeholder={
                            user.firstname ? user.firstname : 'Prénom'
                          }
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
                        <label>Adresse</label>
                        <Form.Control
                          placeholder={user.address ? user.address : 'Adresse'}
                          type='text'
                          name='address'
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
                          placeholder={user.city ? user.city : 'Ville'}
                          type='text'
                          name='city'
                          onChange={e =>
                            handleInputChange(e.target.value, e.target.name)
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col md='6'>
                      <Form.Group>
                        <label>Pays</label>
                        <Form.Control
                          placeholder={user.country ? user.country : 'Pays'}
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
                    <Col md='6'>
                      <Form.Group>
                        <label>Site Web</label>
                        <Form.Control
                          placeholder={user.website_url}
                          type='text'
                          name='website_url'
                          onChange={e =>
                            handleInputChange(e.target.value, e.target.name)
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col md='6'>
                      <Form.Group>
                        <label>Téléphone</label>
                        <Form.Control
                          placeholder={user.phone}
                          type='text'
                          name='phone'
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
                    onClick={() => _updateProfile(user)}
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
                <Card.Title>{user.role}</Card.Title>
                <Card.Subtitle className='mb-2 text-muted'>
                  {user.website_url}
                </Card.Subtitle>
                <Card.Text>{user.address}</Card.Text>
                <Card.Text>{user.city}</Card.Text>
                <Card.Text>{user.country}</Card.Text>
                <Card.Text>{user.about}</Card.Text>
                <Card.Text>{user.phone} </Card.Text>
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

// const mapDispatchToProps = dispatch => ({
//   updateProfile: profileProperties =>
//     dispatch(updateProfile(profileProperties)),
// });
export default connect(mapStateToProps, { updateProfile })(User);
