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
  Dropdown,
} from 'react-bootstrap';

import sideBarImage1 from 'assets/img/sidebar-1.jpg';
import sideBarImage2 from 'assets/img/sidebar-2.jpg';
import sideBarImage3 from 'assets/img/sidebar-3.jpg';
import sideBarImage4 from 'assets/img/sidebar-4.jpg';

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
  };
  const [profileProperties, setprofileProperties] = useState(initialValues);

  // const roles = [
  //   { name: 'CPO', value: 'CPO' },
  //   { name: 'MSP', value: 'MSP' },
  // ];

  // TODO add disabled boolean local state to disable submit button until handleInputChange

  const handleInputChange = (value, fieldName) => {
    setprofileProperties(prevState => ({ ...prevState, [fieldName]: value }));
  };

  const _updateProfile = _user => {
    // !Profile.email && !Profile.password &&
    updateProfile(profileProperties, _user.id);
  };

  return (
    <>
      <div className='fixed-plugin'>
        <Dropdown>
          <Dropdown.Toggle
            id='dropdown-fixed-plugin'
            variant=''
            className='text-white border-0 opacity-100'
          >
            <i className='fas fa-cogs fa-2x mt-1' />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <li className='adjustments-line d-flex align-items-center justify-content-between'>
              <p>Background Image</p>
              <Form.Check
                type='switch'
                id='custom-switch-1-image'
                checked={hasImage}
                onChange={setHasImage}
              />
            </li>
            <li className='adjustments-line mt-3'>
              <p>Filters</p>
              <div className='pull-right'>
                <Badge
                  variant='secondary'
                  className={color === 'black' ? 'active' : ''}
                  onClick={() => setColor('black')}
                />
                <Badge
                  variant='azure'
                  className={color === 'azure' ? 'active' : ''}
                  onClick={() => setColor('azure')}
                />
                <Badge
                  variant='green'
                  className={color === 'green' ? 'active' : ''}
                  onClick={() => setColor('green')}
                />
                <Badge
                  variant='orange'
                  className={color === 'orange' ? 'active' : ''}
                  onClick={() => setColor('orange')}
                />
                <Badge
                  variant='red'
                  className={color === 'red' ? 'active' : ''}
                  onClick={() => setColor('red')}
                />
                <Badge
                  variant='purple'
                  className={color === 'purple' ? 'active' : ''}
                  onClick={() => setColor('purple')}
                />
              </div>
              <div className='clearfix' />
            </li>
            <li className='header-title'>Sidebar Images</li>
            <li className={image === sideBarImage1 ? 'active' : ''}>
              <a
                className='img-holder switch-trigger d-block'
                href='#pablo'
                onClick={e => {
                  e.preventDefault();
                  setImage(sideBarImage1);
                }}
              >
                <img alt='...' src={sideBarImage1} />
              </a>
            </li>
            <li className={image === sideBarImage2 ? 'active' : ''}>
              <a
                className='img-holder switch-trigger d-block'
                href='#pablo'
                onClick={e => {
                  e.preventDefault();
                  setImage(sideBarImage2);
                }}
              >
                <img alt='...' src={sideBarImage2} />
              </a>
            </li>
            <li className={image === sideBarImage3 ? 'active' : ''}>
              <a
                className='img-holder switch-trigger d-block'
                href='#pablo'
                onClick={e => {
                  e.preventDefault();
                  setImage(sideBarImage3);
                }}
              >
                <img alt='...' src={sideBarImage3} />
              </a>
            </li>
            <li className={image === sideBarImage4 ? 'active' : ''}>
              <a
                className='img-holder switch-trigger d-block'
                href='#pablo'
                onClick={e => {
                  e.preventDefault();
                  setImage(sideBarImage4);
                }}
              >
                <img alt='...' src={sideBarImage4} />
              </a>
            </li>
            <li className='button-container'>
              <div>
                <Button
                  block
                  className='btn-fill'
                  href='http://www.creative-tim.com/product/light-bootstrap-dashboard-react'
                  rel='noopener noreferrer'
                  target='_blank'
                  variant='info'
                >
                  Download, it's free!
                </Button>
              </div>
            </li>
            <li className='button-container'>
              <div>
                <Button
                  block
                  className='btn-fill'
                  href='http://www.creative-tim.com/product/light-bootstrap-dashboard-react'
                  rel='noopener noreferrer'
                  target='_blank'
                  variant='default'
                >
                  Checkout docs.
                </Button>
              </div>
            </li>
            <li className='header-title pro-title text-center'>
              Want more components?
            </li>
            <li className='button-container'>
              <div>
                <Button
                  block
                  className='btn-fill'
                  href='http://www.creative-tim.com/product/light-bootstrap-dashboard-pro-react'
                  rel='noopener noreferrer'
                  target='_blank'
                  variant='primary'
                >
                  Get The PRO Version!
                </Button>
              </div>
            </li>
            <li className='header-title' id='sharrreTitle'>
              Thank you for sharing!
            </li>
            <li className='button-container mb-4'>
              <Button
                className='btn-social btn-outline btn-round sharrre'
                id='twitter'
                variant='twitter'
              >
                <i className='fab fa-twitter' />
              </Button>
              <Button
                className='btn-social btn-outline btn-round sharrre'
                id='facebook'
                variant='facebook'
              >
                <i className='fab fa-facebook-square' />
              </Button>
            </li>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <Container fluid>
        <Row>
          <Col md='8'>
            <Card>
              <Card.Header>
                <Card.Title as='h4'>Modifier profil</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={e => e.preventDefault()}>
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
                          placeholder={user.address}
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
                          value={user.city}
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
                          value={user.country}
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

// const mapDispatchToProps = dispatch => ({
//   updateProfile: profileProperties =>
//     dispatch(updateProfile(profileProperties)),
// });
export default connect(mapStateToProps, { updateProfile })(User);
