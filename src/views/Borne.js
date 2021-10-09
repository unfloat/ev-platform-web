import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { addLocation, getCPOLocations } from '../actions/locationAction';

import connectionTypeOptions from './../constants/connectionType';

// react-bootstrap components
import {
  Button,
  Card,
  Form,
  ToggleButton,
  ToggleButtonGroup,
  ButtonGroup,
  Container,
  Row,
  Col,
  Table,
  Badge,
} from 'react-bootstrap';
import { usePosition } from '../hooks/usePosition';

function Borne({ locations, loading, addLocation, user, getCPOLocations }) {
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
      const id = _user.id;
      addLocation({
        ...locationProperties,
        position: {
          latitude: latitude.toString(),
          longitude: longitude.toString(),
        },
        userId: id,
      });
      console.log('locationProperties', locationProperties);
      setlocationProperties(initalValues);
    } else return;
  };

  useEffect(() => {
    getCPOLocations(user.id);
  }, []);

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
                    <Col md='3'>
                      {/* <Form.Group className='mb-3' id='formGridCheckbox'> */}{' '}
                      <label>Type de connection aux stations</label>
                      <br />
                      <ButtonGroup>
                        {connectionTypeOptions.map(option => (
                          <ToggleButton
                            key={option.id}
                            id={`option-${option.id}`}
                            type='checkbox'
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
                      </ButtonGroup>{' '}
                    </Col>
                    <Col md='3'>
                      <label>Reservation</label>
                      <fieldset>
                        <ButtonGroup>
                          <br />
                          <ToggleButton
                            className='mb-2'
                            id='isbookable-switch'
                            type='checkbox'
                            label='Reservable'
                            onChange={e =>
                              setlocationProperties(prev => ({
                                ...prev,
                                bookable: !prev.bookable,
                              }))
                            }
                          >
                            Disponible
                          </ToggleButton>
                          <ToggleButton
                            className='mb-2'
                            id='bookable-switch'
                            type='checkbox'
                            label='Non Reservable'
                            onChange={e =>
                              setlocationProperties(prev => ({
                                ...prev,
                                bookable: !prev.bookable,
                              }))
                            }
                          >
                            Indisponible
                          </ToggleButton>
                        </ButtonGroup>
                      </fieldset>
                    </Col>
                    <Col md='3'>
                      <label>Paiement par carte bancaire</label>
                      <fieldset>
                        <ButtonGroup>
                          <br />
                          <ToggleButton
                            className='mb-2'
                            id='payment_by_card-switch'
                            type='checkbox'
                            onChange={e =>
                              setlocationProperties(prev => ({
                                ...prev,
                                payment_by_card: !prev.payment_by_card,
                              }))
                            }
                          >
                            Disponible
                          </ToggleButton>
                          <ToggleButton
                            className='mb-2'
                            id='payment_by_card-switch'
                            type='checkbox'
                            onChange={e =>
                              setlocationProperties(prev => ({
                                ...prev,
                                payment_by_card: !prev.payment_by_card,
                              }))
                            }
                          >
                            Indisponible
                          </ToggleButton>
                        </ButtonGroup>
                      </fieldset>
                    </Col>
                    <Col md='3'>
                      <label>Recharge</label>
                      <fieldset>
                        <ButtonGroup>
                          <br />
                          <ToggleButton
                            className='mb-2'
                            id='payment_by_card-switch'
                            type='checkbox'
                            onChange={e =>
                              setlocationProperties(prev => ({
                                ...prev,
                                payment_by_card: !prev.payment_by_card,
                              }))
                            }
                          >
                            Gratuite
                          </ToggleButton>
                          <ToggleButton
                            className='mb-2'
                            id='payment_by_card-switch'
                            type='checkbox'
                            onChange={e =>
                              setlocationProperties(prev => ({
                                ...prev,
                                payment_by_card: !prev.payment_by_card,
                              }))
                            }
                          >
                            Payante
                          </ToggleButton>
                        </ButtonGroup>
                      </fieldset>
                    </Col>
                  </Row>
                  <Row>
                    <Col md='4'>
                      <Form.Group>
                        <label>Ville</label>
                        <Form.Control
                          placeholder='Ville'
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
                  <Card.Title as='h4'>Mes Bornes </Card.Title>
                  <p className='card-category'>Bornes enregistrées</p>
                </Card.Header>
                <Card.Body className='table-full-width table-responsive px-0'>
                  <Table className='table-hover table-striped'>
                    <thead>
                      <tr>
                        <th className='border-0'>Titre</th>
                        <th className='border-0'>Type</th>
                        <th className='border-0'>Adresse</th>
                        {/* <th className='border-0'>Standard</th>
                        <th className='border-0'>Voltage Maximum</th>
                        <th className='border-0'>Type de Puissance</th>
                        <th className='border-0'>Ampérage Maximum</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {locations?.length ? (
                        locations?.map(location => {
                          return (
                            <tr>
                              <td>{location.location_name}</td>
                              <td>{location.location_type}</td>
                              <td>{location.address}</td>
                              {/* <td>{location.standard}</td>
                              <td>{location.max_voltage}</td>
                              <td>{location.power_type}</td>
                              <td>{location.max_amperage}</td>{' '} */}
                            </tr>
                          );
                        })
                      ) : (
                        <td>{'Vide'}</td>
                      )}{' '}
                    </tbody>
                  </Table>
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
  locations: state.location.locations,
});

export default connect(mapStateToProps, { getCPOLocations, addLocation })(
  Borne
);
