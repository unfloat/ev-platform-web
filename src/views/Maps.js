import React, { useRef, useState, useEffect } from 'react';
// UI components
import Map from '../components/msp/Map';
import {
  ToggleButton,
  Card,
  Form,
  ButtonGroup,
  Container,
  Row,
  Col,
  Button,
  Alert,
} from 'react-bootstrap';

// constants
import greenEnergyTypeOptions from './../constants/greenEnergyTypes';
import bookableOptions from './../constants/bookable';
import paymentOptions from './../constants/payment';

function Maps() {
  const initialFilters = {
    isBookable: false,
    isGreenEnergy: false,
    isCbPayment: false,
    isFreeCharging: false,
    isAvailable: false,
    supportsTwoWheel: false,
    nominal_power: null,
  };
  const [filters, setFilters] = useState(initialFilters);
  const powerRange = [
    // { value: '', label:'Type de connecteur'},
    { value: 22, label: '22kW' },
    { value: 24, label: '24kW' },
    { value: 7, label: '7kW' },
  ];
  // const setFilter = (value, fieldName) => {
  //   console.log(value, fieldName);
  //   setFilters(prevState => ({
  //     ...prevState,
  //     [fieldName]: value,
  //   }));
  // };

  return (
    <>
      <Container fluid>
        <Row>
          <hr />
        </Row>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as='h4'>Filtrer les stations par:</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col md='6'>
                      {/* <Form.Check
                        type='switch'
                        id='isGreenEnergy-switch'
                        label='Energie verte'
                        name='isGreenEnergy'
                        value={filters.isGreenEnergy}
                        onChange={e =>
                          setFilters(prevState => ({
                            ...prevState,
                            isGreenEnergy: !filters.isGreenEnergy,
                          }))
                        }
                      /> */}
                      <Form.Check
                        type='switch'
                        id='supportsTwoWheel-switch'
                        name='supportsTwoWheel'
                        label='Deux roues'
                        onChange={e =>
                          setFilters(prevState => ({
                            ...prevState,
                            supportsTwoWheel: !filters.supportsTwoWheel,
                          }))
                        }
                      />
                    </Col>

                    <Col md='6'>
                      <Form.Check
                        type='switch'
                        id='isBookable-switch'
                        label='Réservable'
                        name='isBookable'
                        value={true}
                        onChange={e =>
                          setFilters(prevState => ({
                            ...prevState,
                            isBookable: !filters.isBookable,
                          }))
                        }
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md='6'>
                      <Form.Check
                        type='switch'
                        id='isCredit-switch'
                        name='isCbPayment'
                        label='Paiement par carte bancaire'
                        onChange={e =>
                          setFilters(prevState => ({
                            ...prevState,
                            isCbPayment: !filters.isCbPayment,
                          }))
                        }
                      />
                    </Col>
                    <Col md='6'>
                      <Form.Check
                        type='switch'
                        id='isFreeCharging-switch'
                        name='isFreeCharging'
                        label='Recharge Gratuite'
                        onChange={e =>
                          setFilters(prevState => ({
                            ...prevState,
                            isFreeCharging: !filters.isFreeCharging,
                          }))
                        }
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md='6'>
                      <Form.Check
                        type='switch'
                        id='isAvailable-switch'
                        name='isAvailable'
                        label='Disponible'
                        onChange={e =>
                          setFilters(prevState => ({
                            ...prevState,
                            isAvailable: !filters.isAvailable,
                          }))
                        }
                      />
                    </Col>
                    <Col md='6'>
                      <label>Puissance</label>
                      <Form.Control
                        aria-label='Puissance'
                        as='select'
                        custom
                        name='standard'
                        onChange={e =>
                          setFilters(prevState => ({
                            ...prevState,
                            nominal_power: !filters.nominal_power,
                          }))
                        }
                      >
                        {/* <option defaultValue=''>Type de connecteur</option> */}
                        {powerRange.map((option, idx) => (
                          <option key={idx} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>

                  <Button
                    color='primary'
                    className='mt-4'
                    onClick={() => setFilters(initialFilters)}
                  >
                    Réinitialiser
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      {/* <div ref={ref} style={{ height: '300px', width: '500px' }} /> */}
      <Map filters={filters} />
    </>
  );
}

export default Maps;
