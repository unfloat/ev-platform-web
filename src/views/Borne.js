import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { addLocation } from '../actions/locationAction';

import connectionTypeOptions from './../constants/connectionType';

// react-bootstrap components
import {
  Button,
  Card,
  Form,
  ToggleButton,
  ButtonGroup,
  Container,
  Row,
  Col,
  Dropdown,
  Badge,
} from 'react-bootstrap';
import { usePosition } from '../hooks/usePosition';

import sideBarImage1 from 'assets/img/sidebar-1.jpg';
import sideBarImage2 from 'assets/img/sidebar-2.jpg';
import sideBarImage3 from 'assets/img/sidebar-3.jpg';
import sideBarImage4 from 'assets/img/sidebar-4.jpg';

function Borne({ vehicules, loading, addLocation, user, getVehicules }) {
  const [hasImage, setHasImage] = useState(true);
  const [image, setImage] = useState();
  const [color, setColor] = useState();
  const initalValues = {
    name: '',
    address: '',
    city: '',
    bookable: true,
    connection: '',
    condition_acces: '',
    payment_by_card: true,
    location_type: '',
    telephone_operateur: '',
    postal_code: '',
  };
  const [locationProperties, setlocationProperties] = useState(initalValues);

  const handleInputChange = (value, fieldName) => {
    setlocationProperties(prevState => ({ ...prevState, [fieldName]: value }));
  };
  const { latitude, longitude } = usePosition();

  const _addLocation = _user => {
    // if (locationProperties.name !== '') {
    addLocation({
      ...locationProperties,

      userId: _user._id,
      position: {
        latitude: latitude.toString(),
        longitude: longitude.toString(),
      },
    });
    console.log('locationProperties', locationProperties);
    setlocationProperties(initalValues);
    // } else return;
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
                <i className='fab fa-twitter' />· 256
              </Button>
              <Button
                className='btn-social btn-outline btn-round sharrre'
                id='facebook'
                variant='facebook'
              >
                <i className='fab fa-facebook-square' />· 426
              </Button>
            </li>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <Container fluid>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as='h4'>Ajouter une borne</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col md='6'>
                      <Form.Group>
                        <label>Titre</label>
                        <Form.Control
                          placeholder='Titre'
                          type='text'
                          name='name'
                          onChange={e =>
                            handleInputChange(e.target.value, e.target.name)
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col md='6'>
                      <Form.Group>
                        <label>Type d'emplacement</label>
                        <Form.Control
                          placeholder='Station service, parking,...'
                          type='text'
                          name='location_type'
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
                          placeholder='Marque'
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
                    <Col md='3'>
                      <Form.Group>
                        <label>Reservable</label>
                        <Form.Check
                          type='switch'
                          checked={false}
                          name='bookable'
                          onChange={e =>
                            handleInputChange(e.target.value, e.target.name)
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col md='3'>
                      <Form.Group>
                        <label>Paiement par carte bancaire</label>
                        <Form.Check
                          type='switch'
                          checked={false}
                          name='bookable'
                          onChange={e =>
                            handleInputChange(e.target.value, e.target.name)
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col md='6'>
                      <Form.Group>
                        <label>Ville</label>
                        <Form.Control
                          placeholder=''
                          type='text'
                          name='city'
                          onChange={e =>
                            handleInputChange(e.target.value, e.target.name)
                          }
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md='4'>
                      {/* <Form.Control
                          aria-label='Connector select'
                          as='select'
                          custom
                          
                        >
                          <option defaultValue='Type de connection à la station ' />
                          {connectionTypeOptions.map((option, idx) => (
                            <option key={idx} value={option.value}>
                              {option.value}
                            </option>
                          ))}
                        </Form.Control> */}
                      {/* <Form>
                        <Form.Check
                          type='switch'
                          id='custom-switch'
                          label='Check this switch'
                        />
                        <Form.Check
                          disabled
                          type='switch'
                          label='disabled switch'
                          id='disabled-custom-switch'
                        />
                      </Form>
                      <Form.Switch /> */}
                      <Form.Group>
                        <label>Type de connection aux stations</label>
                        <br />
                        <ButtonGroup>
                          {connectionTypeOptions.map(option => (
                            <ToggleButton
                              key={option.id}
                              id={`option-${option.id}`}
                              type='radio'
                              value={option.value}
                              name='connection'
                              onChange={e =>
                                handleInputChange(prevState => ({
                                  ...prevState,
                                  energy: e.target.value,
                                }))
                              }
                            >
                              {option.value}
                            </ToggleButton>
                          ))}
                        </ButtonGroup>
                      </Form.Group>
                    </Col>
                    <Col md='4'>
                      <Form.Group>
                        <label>Condition d'accès</label>
                        <Form.Control
                          placeholder=''
                          type='text'
                          name='condition_acces'
                          onChange={e =>
                            handleInputChange(e.target.value, e.target.name)
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col md='4'>
                      <Form.Group>
                        <label>Téléphone opérateur</label>
                        <Form.Control
                          placeholder='+000 000 000'
                          type='text'
                          name='telephone_operateur'
                          onChange={e =>
                            handleInputChange(e.target.value, e.target.name)
                          }
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Button
          className='btn-fill pull-right'
          type='submit'
          onClick={() => _addLocation(user)}
        >
          Ajouter
        </Button>
      </Container>{' '}
      <br />
      {loading ? (
        <div> Chargement ...</div>
      ) : (
        <Container fluid>
          <Row>
            <Col md='12'>
              <Card className='strpied-tabled-with-hover'>
                <Card.Header>
                  <Card.Title as='h4'>Mes EVs</Card.Title>
                  <p className='card-category'>EVs enregistrés</p>
                </Card.Header>
                <Card.Body className='table-full-width table-responsive px-0'>
                  {/* <Table className='table-hover table-striped'>
                    <thead>
                      <tr>
                        <th className='border-0'>Marque</th>
                        <th className='border-0'>Modèle</th>
                        <th className='border-0'>Format Connecteur</th>
                        <th className='border-0'>Standard</th>
                        <th className='border-0'>Voltage Maximum</th>
                        <th className='border-0'>Type de Puissance</th>
                        <th className='border-0'>Ampérage Maximum</th>
                      </tr>
                    </thead>
                    <tbody>
                 {vehicules?.length ? (
                        vehicules?.map(vehicule => {
                          return (
                            <tr>
                              <td>{vehicule.brand}</td>
                              <td>{vehicule.model}</td>
                              <td>{vehicule.format}</td>
                              <td>{vehicule.standard}</td>
                              <td>{vehicule.max_voltage}</td>
                              <td>{vehicule.power_type}</td>
                              <td>{vehicule.max_amperage}</td>{' '}
                            </tr>
                          );
                        })
                      ) : ( 
                      {''}
                      {/* )} 
                    </tbody>
                  </Table> */}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}

const mapStateToProps = state => ({
  errors: state.errors,
  loading: state.vehicule.loading,
  user: state.auth.user,
});

export default connect(mapStateToProps, { addLocation })(Borne);
