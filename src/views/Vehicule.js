import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addVehicule } from '../actions/vehiculeActions';

import connectorTypeOptions from './../constants/connectorTypes';
import connectorFormatOptions from './../constants/connectorFormat';

// react-bootstrap components
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
} from 'react-bootstrap';

function Vehicule({ vehicules, loading, addVehicule }) {
  const [vehiculeProperties, setvehiculeProperties] = useState({
    brand: '',
    model: '',
    standard: '',
    format: '',
    power_type: '',
    max_voltage: '',
    max_amperage: '',
  });

  const handleInputChange = (value, fieldName) => {
    setvehiculeProperties(prevState => ({ ...prevState, [fieldName]: value }));
  };

  const add = () => {
    console.log(vehiculeProperties);
    if (vehiculeProperties.brand !== '' && vehiculeProperties.model !== '')
      addVehicule(vehiculeProperties);
    else return;
  };

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
                    <Col md='6'>
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
                    <Col md='6'>
                      <Form.Control
                        aria-label='Connector select'
                        as='select'
                        custom
                        name='format'
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
          variant='info'
          onClick={add}
        >
          Ajouter
        </Button>
      </Container>{' '}
    </>
  );
}

const mapStateToProps = state => ({
  errors: state.errors,
  vehicules: state.vehicule.vehicules,
  loading: state.vehicule.loading,
});

export default connect(mapStateToProps, { addVehicule })(Vehicule);
