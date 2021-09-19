import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Form, Card, Container, Row, Col, Button } from 'react-bootstrap';

// constants
import greenEnergyTypeOptions from './../constants/greenEnergyTypes';
import connectorFormatOptions from './../constants/connectorFormat';
import connectorTypes from './../constants/connectorTypes';
import connectorPowerTypesOptions from './../constants/powerTypes';
import bookableOptions from './../constants/bookable';
import freeChargingOptions from './../constants/freeCharging';
import twhoWheelOptions from './../constants/twoWheel';
import payment from 'constants/payment';

const LocationsFilter = ({ user }) => {
  const [filters, setFilters] = useState({});

  return (
    <>
      <Container fluid>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as='h4'>Filtrer les stations par:</Card.Title>
              </Card.Header>
              <Card.Body>
                <Card.Subtitle>Geolocation</Card.Subtitle>
                <Form>
                  <Row>
                    <Col md='6'>
                      <Form.Control
                        aria-label='Connector select'
                        as='select'
                        custom
                        // onChange={e => setFilterName(e.target.value)}
                        onChange={e =>
                          setFilters(prevState => ({
                            ...prevState,
                            freeCharging: e.target.value,
                          }))
                        }
                      >
                        <option defaultValue=''>Recharge gratuite</option>
                        {freeChargingOptions.map((option, idx) => (
                          <option key={idx} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                  {/* <Col md='6'>
                  <Form.Control
                    aria-label='Connector select'
                    as='select'
                    custom
                    name='format'
                    // onChange={e =>
                    //   setFilterName(e.target.value, e.target.name)
                    // }
                    onChange={e =>
                      setFilters(prevState => ({
                        ...prevState,
                        standard: e.target.value,
                      }))
                    }
                  >
                    <option defaultValue=''>Type de connecteur</option>
                    {connectorTypes.map((option, idx) => (
                      <option key={idx} value={option.value}>
                        {option.value}
                      </option>
                    ))}
                  </Form.Control>
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
                      setFilters(prevState => ({
                        ...prevState,
                        format: e.target.value,
                      }))
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
                      setFilters(prevState => ({
                        ...prevState,
                        format: e.target.value,
                      }))
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
              </Row> */}
                  <Button color='primary' onClick={() => setFilters({})}>
                    Réinitialiser
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(LocationsFilter);
