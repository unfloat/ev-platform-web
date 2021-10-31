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
} from 'react-bootstrap';
import { usePosition } from '../hooks/usePosition';

function Borne({
  locations,
  loading,
  addLocation,
  user,
  getCPOLocations,
  updateCPOLocation,
  deleteLocation,
}) {
  const [hasImage, setHasImage] = useState(true);
  const [image, setImage] = useState();
  const [color, setColor] = useState();
  const [freeCharging, setfreeCharging] = useState(false);

  // Form initial values
  const initalValues = {
    name: '',
    address: user.address,
    bookable: false,
    free_charging: false,
    connection: '',
    condition_acces: '',
    payment_by_card: false,
    location_type: '',
    postal_code: '',
    tarif: '',
  };
  // Local State Management
  const { latitude, longitude } = usePosition();
  const [showModal, setshowModal] = useState(false);
  const [showDeleteModal, setshowDeleteModal] = useState(false);
  const [currentStation, setcurrentStation] = useState({});
  const [locationProperties, setlocationProperties] = useState(initalValues);
  // Form functions
  const handleInputChange = (value, fieldName) => {
    setlocationProperties(prevState => ({ ...prevState, [fieldName]: value }));
  };
  // CRUD actions call
  const _addLocation = _user => {
    console.log(_user, '_user', locationProperties, latitude, longitude);
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
      setshowModal(false);
    } else return;
  };
  const _updateLocation = current => {
    console.log('current', current);
    updateCPOLocation(locationProperties, current._id);
    setshowModal(false);
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

  return (
    <>
      {loading ? (
        <div> Chargement ...</div>
      ) : (
        <Container fluid>
          <Button
            className='btn-fill pull-right'
            type='submit'
            onClick={() => setshowModal(true)}
          >
            Nouvelle borne
          </Button>
          <hr />
          <Modal
            show={showModal}
            onHide={() => setshowModal(false)}
            className='search-modal text-center modal fade'
          >
            <Modal.Body>
              <div className='modal-content'>
                <div className='modal-body'>
                  <Card>
                    <Card.Header>
                      <Card.Title as='h4'>
                        {currentStation.location_name
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
                                placeholder='Titre'
                                type='text'
                                name='name'
                                value={locationProperties.name}
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
                                placeholder='Station service, parking,...'
                                type='text'
                                name='location_type'
                                value={locationProperties.location_type}
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
                          <Col md='4'>
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
                            />
                          </Col>
                          <Col md='4'>
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
                          </Col>
                          <Col md='4'>
                            <Form.Check
                              type='switch'
                              id='free_charging-switch'
                              label='Recharge gratuite'
                              value={locationProperties.free_charging}
                              onChange={e =>
                                setlocationProperties(prev => ({
                                  ...prev,
                                  free_charging: !prev.free_charging,
                                }))
                              }
                            />
                          </Col>
                        </Row>
                        {locationProperties.free_charging ? (
                          <br />
                        ) : (
                          <Row>
                            {/* <Col md='6'>
                        <Form.Check
                          type='switch'
                          id='payment_by_card-switch'
                          label='Payement Carte Bancaire'
                          value={locationProperties.payment_by_card}
                          onChange={e =>
                            setlocationProperties(prev => ({
                              ...prev,
                              payment_by_card: !prev.payment_by_card,
                            }))
                          }
                        />
                      </Col> */}
                            <Col md='12'>
                              <Form.Group>
                                <label>Tarif</label>
                                <Form.Control
                                  placeholder='Prix de recharge'
                                  type='text'
                                  name='tarif'
                                  value={locationProperties.tarif}
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
                                value={locationProperties.condition_acces}
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
                      {currentStation.location_name ? (
                        <Button
                          className='btn-fill pull-right'
                          type='submit'
                          onClick={() => _updateLocation(currentStation, user)}
                        >
                          Modifier
                        </Button>
                      ) : (
                        <Button
                          className='btn-fill pull-right'
                          type='submit'
                          onClick={() => _addLocation(user)}
                        >
                          Ajouter
                        </Button>
                      )}
                    </Card.Body>
                  </Card>
                </div>
              </div>
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
                  <Card>
                    <Card.Header>
                      <Card.Title as='h4'>
                        {`Supprimer la borne ${currentStation.location_name}`}
                      </Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Button
                        className='btn-fill pull-right'
                        type='submit'
                        onClick={() => {
                          _deleteLocation(currentStation);
                        }}
                      >
                        Supprimer
                      </Button>
                      <Button
                        className='btn-fill pull-right'
                        type='submit'
                        onClick={() => setshowDeleteModal(false)}
                      >
                        Annuler
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            </Modal.Body>
          </Modal>
          <Row>
            {locations?.length ? (
              locations?.map(location => {
                return (
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
                        {/* <Nav variant='tabs' defaultActiveKey='#first'>
                          <Nav.Item>
                            <Nav.Link href='#first'>Active</Nav.Link>
                            <p className='description text-center'>
                              {location.location_type}
                              {location.address}
                            </p>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link href='#link'>Link</Nav.Link>
                            {location.address}

                            {location.standard}
                            {location.max_voltage}
                            {location.power_type}
                            {location.max_amperage}
                          </Nav.Item>
                        </Nav> */}
                        {location.location_name}
                        <br />

                        {location.location_type}
                        <br />
                        {location.address}
                        <br />
                      </Card.Body>
                      <Card.Footer>
                        <small className='text-muted'>
                          Last updated 3 mins ago
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
                                setshowModal(true);
                                setcurrentStation(location);
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
