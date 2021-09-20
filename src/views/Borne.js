import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { addVehicule } from '../actions/vehiculeActions';
import { getVehicules } from '../actions/vehiculeActions';

import connectorTypeOptions from './../constants/connectorTypes';
import connectorFormatOptions from './../constants/connectorFormat';
import connectorPowerTypesOptions from './../constants/powerTypes';

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Table,
  Nav,
  Container,
  Row,
  Col,
} from 'react-bootstrap';

function Borne({ vehicules, loading, addVehicule, user, getVehicules }) {
  const initalValues = {
    id: '',
    brand: '',
    model: '',
    standard: '',
    format: '',
    power_type: '',
    max_voltage: '',
    max_amperage: '',
  };
  const [vehiculeProperties, setvehiculeProperties] = useState(initalValues);

  const handleInputChange = (value, fieldName) => {
    setvehiculeProperties(prevState => ({ ...prevState, [fieldName]: value }));
  };

  const add = _user => {
    if (vehiculeProperties.brand !== '' && vehiculeProperties.model !== '') {
      addVehicule({ ...vehiculeProperties, id: _user._id });
      console.log(_user);
      setvehiculeProperties(initalValues);
      getVehicules();
    } else return;
  };
  useEffect(() => {
    getVehicules();
    console.log('useeffect', vehicules);
  }, [getVehicules]);
  return (
    <>
      <Container fluid>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as='h4'>Ajouter un Véhicule Electrique</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col md='6'>
                      <Form.Group>
                        <label>Marque</label>
                        <Form.Control
                          placeholder='Marque'
                          type='text'
                          name='brand'
                          onChange={e =>
                            handleInputChange(e.target.value, e.target.name)
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col md='6'>
                      <Form.Group>
                        <label>Modèle</label>
                        <Form.Control
                          placeholder='Modèle'
                          type='text'
                          name='model'
                          onChange={e =>
                            handleInputChange(e.target.value, e.target.name)
                          }
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md='4'>
                      <Form.Control
                        aria-label='Connector select'
                        as='select'
                        custom
                        name='standard'
                        onChange={e =>
                          handleInputChange(e.target.value, e.target.name)
                        }
                      >
                        <option defaultValue=''>Type de connecteur</option>
                        {connectorTypeOptions.map((option, idx) => (
                          <option key={idx} value={option.value}>
                            {option.value}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md='4'>
                      <Form.Control
                        aria-label='Connector select'
                        as='select'
                        custom
                        name='format'
                        onChange={e =>
                          handleInputChange(e.target.value, e.target.name)
                        }
                      >
                        <option defaultValue=''>Format connecteur</option>
                        {connectorFormatOptions.map((option, idx) => (
                          <option key={idx} value={option.value}>
                            {option.value}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>

                    <Col md='4'>
                      <Form.Control
                        aria-label='Connector select'
                        as='select'
                        custom
                        name='format'
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
                  <Row>
                    <Col md='4'>
                      <Form.Group>
                        <label>Type de puissance</label>
                        <Form.Control
                          placeholder='Puissance'
                          type='text'
                          name='power_type'
                          onChange={e =>
                            handleInputChange(e.target.value, e.target.name)
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col md='4'>
                      <Form.Group>
                        <label>Voltage Maximum</label>
                        <Form.Control
                          placeholder='Voltage'
                          type='text'
                          name='max_voltage'
                          onChange={e =>
                            handleInputChange(e.target.value, e.target.name)
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col md='4'>
                      <Form.Group>
                        <label>Ampérage Maximum</label>
                        <Form.Control
                          placeholder='Ampérage'
                          type='text'
                          name='max_amperage'
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
          onClick={() => add(user)}
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
                  <Table className='table-hover table-striped'>
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
                        <p>{''}</p>
                      )}
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
  vehicules: state.vehicule.vehicules,
  loading: state.vehicule.loading,
  user: state.auth.user,
});

export default connect(mapStateToProps, { getVehicules, addVehicule })(Borne);
