import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { addLocation, getCPOLocations } from '../actions/locationAction';
import {
  Button,
  Card,
  Form,
  ToggleButton,
  ButtonGroup,
  Container,
  Row,
  Col,
} from 'react-bootstrap';

function ConnectorForm({
  locations,
  loading,
  addLocation,
  user,
  getCPOLocations,
}) {
  const [hasImage, setHasImage] = useState(true);
  const [image, setImage] = useState();
  const [color, setColor] = useState();

  const initalValues = {
    connection: '',
  };

  const [connectorProperties, setconnectorProperties] = useState(initalValues);

  const handleInputChange = (value, fieldName) => {
    setconnectorProperties(prevState => ({ ...prevState, [fieldName]: value }));
  };

  const _addConnector = _location => {
    if (locationProperties.name !== '') {
      addLocation({
        ...locationProperties,
        position: {
          latitude: latitude.toString(),
          longitude: longitude.toString(),
        },
        userId: _user.id,
      });
      setlocationProperties(initalValues);
    } else return;
  };

  useEffect(() => {
    getCPOLocations(user.id);
  }, [getCPOLocations]);

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
                          value={locationProperties.name}
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
                          value={locationProperties.location_type}
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
                          value={locationProperties.address}
                          onChange={e =>
                            handleInputChange(e.target.value, e.target.name)
                          }
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
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
                            value={locationProperties.Reservable}
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
                            value={locationProperties.Reservable}
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
                            value={locationProperties.checkbox}
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
                            value={locationProperties.checkbox}
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
                            value={locationProperties.checkbox}
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
                            value={locationProperties.checkbox}
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
                          value={locationProperties.city}
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
                          value={locationProperties.condition_acces}
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
                          value={locationProperties.telephone_operateur}
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
  ConnectorForm
);
