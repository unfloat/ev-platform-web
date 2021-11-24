import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  addLocation,
  getCPOLocations,
  updateCPOLocation,
  deleteLocation,
} from '../actions/locationAction';
import {
  Button,
  Card,
  Form,
  Container,
  Row,
  Col,
  Modal,
  OverlayTrigger,
  Tooltip,
  Nav,
  ListGroupItem,
  ListGroup,
} from 'react-bootstrap';
import { usePosition } from '../hooks/usePosition';
import connectorTypeOptions from './../constants/connectorTypes';
import connectorFormatOptions from './../constants/connectorFormat';
import connectorPowerTypesOptions from './../constants/powerTypes';

function Borne({
  locations,
  loading,
  addLocation,
  user,
  getCPOLocations,
  updateCPOLocation,
  deleteLocation,
}) {
  const [currentStation, setcurrentStation] = useState({});
  const [useGeo, setuseGeo] = useState({ geo: false });

  // Form initial values
  const initialValues = {
    location_name: currentStation.location_name ?? '',
    address: currentStation.address ?? user.address,
    bookable: currentStation.bookable ?? false,
    free_charging: currentStation.free_charging ?? false,
    connection: currentStation.connection ?? '',
    condition_acces: currentStation.condition_acces ?? '',
    payment_by_card: currentStation.payment_by_card ?? false,
    location_type: currentStation.location_type ?? '',
    postal_code: currentStation.postal_code ?? '',
    tarif: currentStation.tarif ?? '',
    standard: currentStation.standard ?? '',
    format: currentStation.format ?? '',
    power_type: currentStation.power_type ?? '',
    max_voltage: currentStation.max_voltage ?? '',
    max_amperage: currentStation.max_amperage ?? '',
    longitude: currentStation.longitude ?? '',
    latitude: currentStation.latitude ?? '',
  };
  // Local State Management
  const { latitude, longitude } = usePosition();

  // Modal Add/Update
  const [showModal, setshowModal] = useState(false);
  // Modal Delete
  const [showDeleteModal, setshowDeleteModal] = useState(false);
  const [locationProperties, setlocationProperties] = useState(initialValues);
  // Form functions
  const handleInputChange = (value, fieldName) => {
    setlocationProperties(prevState => ({ ...prevState, [fieldName]: value }));
  };
  // CRUD actions call
  const _addLocation = _user => {
    if (locationProperties) {
      console.log('locationProperties', locationProperties);

      if (useGeo.geo === true) {
        addLocation({
          ...locationProperties,
          position: {
            latitude: latitude,
            longitude: longitude,
          },
          userId: _user.id,
        });
      } else {
        addLocation({
          ...locationProperties,
          position: {
            latitude: locationProperties.latitude,
            longitude: locationProperties.longitude,
          },
          userId: _user.id,
        });
      }

      setlocationProperties(initialValues);
      setshowModal(false);
    } else return;
  };
  const _updateLocation = current => {
    updateCPOLocation(locationProperties, current._id);
    setshowModal(false);
    setlocationProperties(initialValues);
    setcurrentStation({});
  };

  const _deleteLocation = current => {
    console.log(' _user.id', user.id);
    deleteLocation(current._id, user.id);
    setshowDeleteModal(false);
    setcurrentStation({});
  };

  useEffect(() => {
    getCPOLocations(user.id);
  }, [getCPOLocations]);

  useEffect(() => {
    if (currentStation) setlocationProperties({ ...currentStation });
  }, [currentStation]);

  return (
    <>
      {loading ? (
        <div> Chargement ...</div>
      ) : (
        <Container fluid>
          <Button
            className='btn-fill pull-right'
            type='submit'
            onClick={() => {
              setcurrentStation({});
              setshowModal(true);
            }}
          >
            Nouvelle borne
          </Button>
          <hr />
          {currentStation ? (
            <>
              <Modal show={showModal} onHide={() => setshowModal(false)}>
                <Modal.Body>
                  <Card>
                    <Card.Header>
                      <Card.Title as='h4'>
                        {currentStation._id
                          ? `Modifier la borne ${currentStation.location_name}`
                          : `Nouvelle borne`}
                      </Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Form>
                        <Row>
                          <Col md='6'>
                            <Form.Group>
                              <label>Titre</label>
                              <Form.Control
                                placeholder={
                                  currentStation.location_name ?? 'Titre'
                                }
                                type='text'
                                name='location_name'
                                onChange={e =>
                                  handleInputChange(
                                    e.target.value,
                                    e.target.name
                                  )
                                }
                              />
                            </Form.Group>
                          </Col>
                          <Col md='6'>
                            <Form.Group>
                              <label>Type d'emplacement</label>
                              <Form.Control
                                placeholder={
                                  currentStation.location_type ??
                                  'Station service, parking,...'
                                }
                                type='text'
                                name='location_type'
                                onChange={e =>
                                  handleInputChange(
                                    e.target.value,
                                    e.target.name
                                  )
                                }
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            {/* <Col md='4'> */}
                            <Form.Check
                              type='switch'
                              id='isbookable-switch'
                              label='Reservation'
                              value={locationProperties.bookable}
                              onChange={e =>
                                setlocationProperties(prev => ({
                                  ...prev,
                                  bookable: !prev.bookable,
                                }))
                              }
                            />{' '}
                            {/* </Col>
                          <Col md='4'> */}
                            <Form.Check
                              type='switch'
                              id='isLive-switch'
                              label='Live'
                              value={locationProperties.status}
                              onChange={e =>
                                setlocationProperties(prev => ({
                                  ...prev,
                                  status: !prev.status,
                                }))
                              }
                            />
                            {/* </Col>
                          <Col md='4'> */}
                            <Form.Check
                              type='switch'
                              id='free_charging-switch'
                              label='Recharge gratuite'
                              onChange={e =>
                                setlocationProperties(prev => ({
                                  ...prev,
                                  free_charging: !prev.free_charging,
                                }))
                              }
                            />
                            {/* </Col> */}
                          </Col>
                        </Row>
                        {locationProperties.free_charging ? (
                          <></>
                        ) : (
                          <Row>
                            <Col md='12'>
                              <Form.Group>
                                <label>Tarif</label>
                                <Form.Control
                                  placeholder='Prix de recharge'
                                  type='text'
                                  name='tarif'
                                  onChange={e =>
                                    handleInputChange(
                                      e.target.value,
                                      e.target.name
                                    )
                                  }
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                        )}
                        <Row>
                          <Col md='12'>
                            <Form.Group>
                              <label>Condition d'accès</label>
                              <Form.Control
                                placeholder={`Conditions d'accès`}
                                type='text'
                                name='condition_acces'
                                onChange={e =>
                                  handleInputChange(
                                    e.target.value,
                                    e.target.name
                                  )
                                }
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Form.Check
                              type='switch'
                              id='geo-switch'
                              label='Utiliser ma géolocalisation'
                              name='geo'
                              onChange={e =>
                                setuseGeo(prev => ({
                                  ...prev,
                                  geo: !prev.geo,
                                }))
                              }
                            />
                          </Col>
                        </Row>

                        {useGeo.geo ? (
                          <></>
                        ) : (
                          <>
                            <Row>
                              <Col md='6'>
                                <Form.Group>
                                  <label>Latitude</label>
                                  <Form.Control
                                    type='text'
                                    placeholder={latitude ?? 'Latitude'}
                                    name='latitude'
                                    onChange={e =>
                                      handleInputChange(
                                        e.target.value,
                                        e.target.name
                                      )
                                    }
                                  />
                                </Form.Group>
                              </Col>
                              <Col md='6'>
                                <Form.Group>
                                  <label>Longitude</label>
                                  <Form.Control
                                    type='text'
                                    placeholder={longitude ?? 'Longitude'}
                                    name='longitude'
                                    onChange={e =>
                                      handleInputChange(
                                        e.target.value,
                                        e.target.name
                                      )
                                    }
                                  />
                                </Form.Group>
                              </Col>
                            </Row>
                          </>
                        )}
                        <Row>
                          <Col>
                            <Form.Control
                              aria-label='Connector select'
                              as='select'
                              custom
                              name='standard'
                              onChange={e =>
                                handleInputChange(e.target.value, e.target.name)
                              }
                            >
                              <option defaultValue=''>
                                Type de connecteur
                              </option>
                              {connectorTypeOptions.map((option, idx) => (
                                <option key={idx} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </Form.Control>
                          </Col>
                        </Row>
                        <Row>
                          <Col md='6'>
                            <Form.Group>
                              <label>Voltage Maximum</label>
                              <Form.Control
                                placeholder='Voltage'
                                type='text'
                                name='max_voltage'
                                onChange={e =>
                                  handleInputChange(
                                    e.target.value,
                                    e.target.name
                                  )
                                }
                              />
                            </Form.Group>
                          </Col>
                          <Col md='6'>
                            <Form.Group>
                              <label>Ampérage Maximum</label>
                              <Form.Control
                                placeholder='Ampérage'
                                type='text'
                                name='max_amperage'
                                onChange={e =>
                                  handleInputChange(
                                    e.target.value,
                                    e.target.name
                                  )
                                }
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col md='6'>
                            <Form.Control
                              aria-label='Connector select'
                              as='select'
                              custom
                              name='format'
                              // onChange={e =>
                              //   setFilterName(e.target.value, e.target.name)
                              // }
                              onChange={e =>
                                handleInputChange(e.target.value, e.target.name)
                              }
                            >
                              <option defaultValue=''>Type de format</option>
                              {connectorFormatOptions.map((option, idx) => (
                                <option key={idx} value={option.value}>
                                  {option.value}
                                </option>
                              ))}
                            </Form.Control>
                          </Col>
                          <Col md='6'>
                            <Form.Control
                              aria-label='Connector select'
                              as='select'
                              custom
                              name='format'
                              // onChange={e =>
                              //   setFilterName(e.target.value, e.target.name)
                              // }
                              onChange={e =>
                                handleInputChange(e.target.value, e.target.name)
                              }
                            >
                              <option defaultValue=''>Type de Puissance</option>
                              {connectorPowerTypesOptions.map((option, idx) => (
                                <option key={idx} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </Form.Control>
                          </Col>
                        </Row>
                      </Form>
                    </Card.Body>
                    <Card.Footer>
                      {currentStation._id ? (
                        <Button
                          className='btn-fill pull-right'
                          type='submit'
                          onClick={() => _updateLocation(currentStation)}
                        >
                          Modifier
                        </Button>
                      ) : (
                        <Button
                          className='btn-fill pull-right'
                          type='submit'
                          onClick={() => {
                            _addLocation(user);
                          }}
                        >
                          Ajouter
                        </Button>
                      )}
                    </Card.Footer>
                  </Card>
                </Modal.Body>
              </Modal>
              <Modal
                show={showDeleteModal}
                onHide={() => setshowDeleteModal(false)}
                className='search-modal text-center modal fade'
              >
                <Modal.Body>
                  <div className='modal-content'>
                    <div className='modal-body'>
                      <Row>
                        <Col>
                          {`Supprimer la borne ${currentStation.location_name}`}
                        </Col>
                      </Row>

                      <Row>
                        <Col>
                          <Button
                            className='btn-fill pull-right'
                            type='submit'
                            onClick={() => {
                              _deleteLocation(currentStation);
                            }}
                          >
                            Supprimer
                          </Button>
                        </Col>
                        <Col>
                          <Button
                            className='btn-fill pull-right'
                            type='submit'
                            onClick={() => setshowDeleteModal(false)}
                          >
                            Annuler
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Modal.Body>
              </Modal>
            </>
          ) : (
            <hr />
          )}

          <Row>
            {locations?.length ? (
              locations?.map(location => {
                return (
                  <Col md='6'>
                    <Card>
                      <Card.Header>{location.location_name}</Card.Header>
                      <Card.Body>
                        <Card.Title>{location.address}</Card.Title>
                        <br />
                        <Card.Subtitle>{location.location_type}</Card.Subtitle>
                        <br />
                        <ListGroup className='list-group-flush'>
                          <ListGroupItem>
                            Recharge:
                            {location.free_charging ? ' gratuite' : ' payante'}
                          </ListGroupItem>
                          <ListGroupItem>
                            {location.bookable
                              ? 'Reservable'
                              : 'Non reservable'}
                          </ListGroupItem>
                          <ListGroupItem>
                            Conditions d'accès: {location.condition_acces}
                          </ListGroupItem>

                          <ListGroupItem>
                            Standard connecteur {location.standard}{' '}
                          </ListGroupItem>
                          <ListGroupItem>
                            Ampérage: {location.max_amperage}
                          </ListGroupItem>

                          <ListGroupItem>
                            Voltage {location.max_voltage}
                          </ListGroupItem>
                        </ListGroup>
                      </Card.Body>
                      <Card.Footer>
                        <small className='text-muted'>
                          <OverlayTrigger
                            overlay={
                              <Tooltip id='tooltip-488980961'>Modifier</Tooltip>
                            }
                          >
                            <Button
                              className='btn-simple btn-link p-1'
                              type='button'
                              variant='info'
                              onClick={() => {
                                setcurrentStation(location);
                                setshowModal(true);
                                console.log(currentStation);
                              }}
                            >
                              <i className='fas fa-edit' />
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            overlay={
                              <Tooltip id='tooltip-506045838'>
                                Supprimer
                              </Tooltip>
                            }
                          >
                            <Button
                              className='btn-simple btn-link p-1'
                              type='button'
                              variant='danger'
                              onClick={() => {
                                setcurrentStation(location);
                                setshowDeleteModal(true);
                              }}
                            >
                              <i className='fas fa-times' />
                            </Button>
                          </OverlayTrigger>
                        </small>
                      </Card.Footer>
                    </Card>
                  </Col>
                );
              })
            ) : (
              <p>Aucune borne pour le moment</p>
            )}
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

export default connect(mapStateToProps, {
  getCPOLocations,
  addLocation,
  updateCPOLocation,
  deleteLocation,
})(Borne);
