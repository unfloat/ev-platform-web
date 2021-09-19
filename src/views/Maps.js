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
} from 'react-bootstrap';

import { Form, Card, Container, Row, Col, Button } from 'react-bootstrap';
import Map from './../components/Map';
// constants
import greenEnergyTypeOptions from './../constants/greenEnergyTypes';
import bookableOptions from './../constants/bookable';
import paymentOptions from './../constants/payment';

function Maps() {
  const [filters, setFilters] = useState({});
  const [map, setMap] = useState(null);
  const ref = React.createRef();

  useEffect(() => {
    const onLoad = () => {
      try {
        const options = {
          lat: 45.891181,
          lng: 4.8223994,
        };
        // if (latitude && longitude) {
        //   options.lat = latitude;
        //   options.lng = longitude;
        //   options.zoom = 7;
        // }
        const map = new window.google.maps.Map(ref.current, {
          center: options,
          zoom: 15,
        });

        if (map) {
          setMap(map);
          console.log('map==========', map);
          // getLocations();
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (!window.google) {
      const script = document.createElement(`script`);
      // + process.env.GOOGLE_MAPS_API_KEY;
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBwo-QDe0-NuBA5EZSM9UiyAnTYok74maU`;
      document.head.append(script);
      script.addEventListener(`load`, onLoad);

      return () => script.removeEventListener(`load`, onLoad);
    } else onLoad();
  });
  const mapRef = useRef(null);
  const [filterName, setFilterName] = useState('');
  const [filters, setFilters] = useState({});
  const [selectedStation, setSelectedStation] = useState(null);

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
                      {/* <Form.Group
                        className='mb-3'
                        controlId='formBasicCheckbox'
                      >
                        <Form.Check type='checkbox' label='Check me out' />
                      </Form.Group> */}

                      {/* <Form>
                        <Form.Check
                          type='switch'
                          id='custom-switch'
                          label='Check this switch'
                        />
                        <Form.Check
                          disabled
                          type='switch'
                          label='disabled switch'
                          id='disabled-custom-switch'
                        />
                      </Form>
                      <Form.Switch /> */}

                      <ButtonGroup>
                        {greenEnergyTypeOptions.map(option => (
                          <ToggleButton
                            key={option.id}
                            id={`option-${option.id}`}
                            type='radio'
                            name='greenEnergy'
                            value={option.value}
                            onChange={e =>
                              setFilters(prevState => ({
                                ...prevState,
                                greenEnergy: e.target.value,
                              }))
                            }
                          >
                            {option.label}
                          </ToggleButton>
                        ))}
                      </ButtonGroup>
                    </Col>
                    <Col md='6'>
                      <ButtonGroup>
                        {bookableOptions.map(option => (
                          <ToggleButton
                            key={option.id}
                            id={`option-${option.id}`}
                            type='radio'
                            name='bookable'
                            value={option.value}
                            onChange={e =>
                              setFilters(prevState => ({
                                ...prevState,
                                bookable: e.target.value,
                              }))
                            }
                          >
                            {option.label}
                          </ToggleButton>
                        ))}
                      </ButtonGroup>
                    </Col>
                  </Row>
                  <Row>
                    {' '}
                    <Col md='6'>
                      <ButtonGroup>
                        {paymentOptions.map(option => (
                          <ToggleButton
                            key={option.id}
                            id={`option-${option.id}`}
                            type='radio'
                            name='payment_by_card'
                            value={option.value}
                            onChange={e =>
                              setFilters(prevState => ({
                                ...prevState,
                                payment_by_card: e.target.value,
                              }))
                            }
                          >
                            {option.label}
                          </ToggleButton>
                        ))}
                      </ButtonGroup>
                    </Col>
                    {/* <Form.Control
                        aria-label='Connector select'
                        as='select'
                        custom
                        // onChange={e => setFilterName(e.target.value)}
                        onChange={e =>
                          setFilters(prevState => ({
                            ...prevState,
                            energy: e.target.value,
                          }))
                        }
                      >
                        <option defaultValue=''>Type d'Energie</option>
                        {greenEnergyTypeOptions.map((option, idx) => (
                          <option key={idx} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Form.Control> 
                    </Col>
                    <Col md='6'>
                      <Form.Control
                        aria-label='Connector select'
                        as='select'
                        custom
                        // onChange={e => setFilterName(e.target.value)}
                        onChange={e =>
                          setFilters(prevState => ({
                            ...prevState,
                            bookable: e.target.value,
                          }))
                        }
                      >
                        <option defaultValue=''>Réservation</option>
                        {bookableOptions.map((option, idx) => (
                          <option key={idx} value={option.value}>
                            {option.label}
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
                        // onChange={e => setFilterName(e.target.value)}
                        onChange={e =>
                          setFilters(prevState => ({
                            ...prevState,
                            payment_by_card: e.target.value,
                          }))
                        }
                      >
                        <option defaultValue=''>Paiement CB</option>
                        {payment.map((option, idx) => (
                          <option key={idx} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    */}
                  </Row>
                  <Button color='primary' onClick={() => setFilters({})}>
                    Réinitialiser
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      {/* <div ref={ref} style={{ height: '300px', width: '500px' }} /> */}
      <Map filters={filters} map={map} ref={ref} />
    </>
  );
}

export default Maps;
