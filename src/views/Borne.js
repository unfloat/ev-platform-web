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

function Borne({ vehicules, loading, addLocation, user, getVehicules }) {
  const [hasImage, setHasImage] = useState(true);
  const [image, setImage] = useState();
  const [color, setColor] = useState();
  const initalValues = {
    name: '',
    address: '',
    city: '',
    bookable: false,
    connection: '',
    condition_acces: '',
    payment_by_card: false,
    location_type: '',
    telephone_operateur: '',
    postal_code: '',
  };
  const { latitude, longitude } = usePosition();

  const [locationProperties, setlocationProperties] = useState(initalValues);

  const handleInputChange = (value, fieldName) => {
    setlocationProperties(prevState => ({ ...prevState, [fieldName]: value }));
  };

  const _addLocation = _user => {
    if (locationProperties.name !== '') {
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
    } else return;
  };

  return (
    <>
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
                          placeholder='Adresse'
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
                    <Col md='4'>
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
                        <label>Reservation</label>
                        <br />

                        <ToggleButton
                          className='mb-2'
                          id='bookable-switch'
                          type='checkbox'
                          label='Reservable'
                          checked={locationProperties.bookable}
                          value={locationProperties.bookable}
                          onChange={e =>
                            setlocationProperties(prev => ({
                              ...prev,
                              bookable: !prev.bookable,
                            }))
                          }
                        >
                          Reservation{' '}
                        </ToggleButton>
                      </Form.Group>
                    </Col>
                    <Col md='4'>
                      <label>Paiement</label>
                      <br />
                      <ToggleButton
                        className='mb-2'
                        id='payment_by_card-toggle'
                        type='checkbox'
                        variant='outline-primary'
                        checked={locationProperties.payment_by_card}
                        value={locationProperties.payment_by_card}
                        onChange={e =>
                          setlocationProperties(prev => ({
                            ...prev,
                            payment_by_card: !prev.payment_by_card,
                          }))
                        }
                      >
                        Carte Bancaire
                      </ToggleButton>
                    </Col>
                  </Row>
                  <Row>
                    <Col md='4'>
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
                  <Row>
                    <Col md='6'>
                      <Form.Group>
                        <label>Latitude</label>
                        <Form.Control
                          disabled
                          type='text'
                          value={latitude ? latitude : 'latitude'}
                        />
                      </Form.Group>
                    </Col>
                    <Col md='6'>
                      <Form.Group>
                        <label>Longitude</label>
                        <Form.Control
                          disabled
                          type='text'
                          value={longitude ? longitude : 'longitude'}
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
