import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  addVehicule,
  updateVehicule,
  getVehicules,
  deleteVehicule,
} from '../actions/vehiculeActions';
import connectorTypeOptions from './../constants/connectorTypes';
import {
  Button,
  Card,
  Form,
  Modal,
  Container,
  Row,
  Col,
  OverlayTrigger,
  ListGroupItem,
  Tooltip,
} from 'react-bootstrap';

function Vehicule({
  vehicules,
  loading,
  addVehicule,
  user,
  getVehicules,
  updateVehicule,
  deleteVehicule,
}) {
  // Current Vehicule
  const [currentVehicule, setcurrentVehicule] = useState({});
  // Form initial values
  const initalValues = {
    brand: '',
    model: '',
    standard: '',
    format: '',
    power_type: '',
    max_voltage: '',
    max_amperage: '',
  };

  // Local State Management
  const [vehiculeProperties, setvehiculeProperties] = useState(initalValues);
  // Modal Add/Update
  const [showModal, setshowModal] = useState(false);
  // Modal Delete
  const [showDeleteModal, setshowDeleteModal] = useState(false);
  // Form functions
  const handleInputChange = (value, fieldName) => {
    setvehiculeProperties(prevState => ({ ...prevState, [fieldName]: value }));
  };
  // CRUD actions call
  const _addVehicule = _user => {
    if (vehiculeProperties.brand !== '' && vehiculeProperties.model !== '') {
      addVehicule({ ...vehiculeProperties, userId: _user.id });
      setvehiculeProperties(initalValues);
      setshowModal(false);
    } else return;
  };

  const _updateVehicule = current => {
    console.log('vehiculeProperties', vehiculeProperties, 'current', current);
    updateVehicule(vehiculeProperties, current._id);
    setvehiculeProperties(initalValues);
    setshowModal(false);
    setcurrentVehicule({});
    console.log('vehiculeProperties', vehiculeProperties, 'current', current);
  };

  const _deleteVehicule = current => {
    deleteVehicule(current._id, user.id);
    setshowDeleteModal(false);
    setcurrentVehicule({});
  };

  useEffect(() => {
    getVehicules(user.id);
  }, []);

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
              setcurrentVehicule({});
              setshowModal(true);
            }}
          >
            Nouveau véhicule
          </Button>
          <hr />
          {currentVehicule ? (
            <>
              <Modal
                show={showModal}
                onHide={() => setshowModal(false)}
                className='search-modal text-center modal fade'
              >
                <Modal.Body>
                  <Card>
                    <Card.Header>
                      <Card.Title as='h4'>
                        {currentVehicule._id
                          ? `EV: ${currentVehicule.brand}`
                          : `Nouveau vehicule`}
                      </Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Form>
                        <Row>
                          <Col md='6'>
                            <Form.Group>
                              <label>Marque</label>
                              <Form.Control
                                placeholder={currentVehicule.brand ?? 'Marque'}
                                type='text'
                                name='brand'
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
                              <label>Modèle</label>
                              <Form.Control
                                placeholder={currentVehicule.model ?? 'Modèle'}
                                type='text'
                                name='model'
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
                                placeholder={
                                  currentVehicule.max_voltage ?? 'Voltage'
                                }
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
                                placeholder={
                                  currentVehicule.max_amperage ?? 'Ampérage'
                                }
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
                      </Form>
                      {currentVehicule._id ? (
                        <Button
                          className='btn-fill pull-right'
                          type='submit'
                          onClick={() => _updateVehicule(currentVehicule)}
                        >
                          Modifier
                        </Button>
                      ) : (
                        <Button
                          className='btn-fill pull-right'
                          type='submit'
                          onClick={() => _addVehicule(user)}
                        >
                          Ajouter
                        </Button>
                      )}
                    </Card.Body>
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
                      <Card>
                        <Card.Header>
                          <Card.Title as='h4'>
                            {`Supprimer EV ${currentVehicule.brand}`}
                          </Card.Title>
                        </Card.Header>
                        <Card.Body>
                          <Button
                            className='btn-fill pull-right'
                            type='submit'
                            onClick={() => {
                              _deleteVehicule(currentVehicule);
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
            </>
          ) : (
            <hr />
          )}
          <Row>
            <Col md='12'>
              <Row>
                {vehicules?.length ? (
                  vehicules?.map(vehicule => {
                    return (
                      <Col md='6'>
                        <Card style={{ width: '18rem' }}>
                          <Card.Body>
                            <h3 className='title'>
                              {vehicule.brand},{vehicule.model}
                            </h3>
                            {vehicule.standard ? (
                              <img
                                alt='...'
                                className='avatar border-gray'
                                src={
                                  require(`assets/img/connectors/${vehicule.standard}.png`)
                                    .default
                                }
                              />
                            ) : (
                              <br />
                            )}
                            <br />

                            <ListGroupItem>{vehicule.standard}</ListGroupItem>

                            <ListGroupItem>
                              Voltage: {vehicule.max_voltage}
                            </ListGroupItem>
                            <ListGroupItem>
                              Ampérage: {vehicule.max_amperage}
                            </ListGroupItem>
                            <OverlayTrigger
                              overlay={
                                <Tooltip id='tooltip-488980961'>
                                  Modifier
                                </Tooltip>
                              }
                            >
                              <Button
                                className='btn-simple btn-link p-1'
                                type='button'
                                variant='info'
                                onClick={() => {
                                  setcurrentVehicule(vehicule);
                                  setshowModal(true);
                                  console.log(
                                    'currentVehicule',
                                    currentVehicule
                                  );
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
                                  setcurrentVehicule(vehicule);
                                  setshowDeleteModal(true);
                                }}
                              >
                                <i className='fas fa-times' />
                              </Button>
                            </OverlayTrigger>
                          </Card.Body>
                        </Card>
                      </Col>
                    );
                  })
                ) : (
                  <p>Aucun EV pour le moment</p>
                )}
              </Row>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}
const mapStateToProps = state => ({
  errors: state.errors,
  vehicules: state.vehicule.vehicules,
  loading: state.vehicule.loading,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  getVehicules,
  addVehicule,
  updateVehicule,
  deleteVehicule,
})(Vehicule);
