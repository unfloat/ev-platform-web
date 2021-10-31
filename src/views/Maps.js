import React, { useRef, useState, useEffect } from 'react';
// UI components
import Map from '../components/msp/Map';
import {
  ToggleButton,
  Card,
  ButtonGroup,
  Container,
  Row,
  Col,
  Button,
  Alert,
} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

// constants
import greenEnergyTypeOptions from './../constants/greenEnergyTypes';
import bookableOptions from './../constants/bookable';
import paymentOptions from './../constants/payment';

/*
    distance: 1,
    distanceunit: 'KM',
    latitude: 0,
    longitude: 0,
    */
function Maps() {
  const initialFilters = {
    maxresults: 0,
    recently_verified: false,
    is_operational: false,
    postal_code: '',
    connector_type: '',
    latitude: 49.2603667,
    longitude: 3.0872607,
  };
  // const initialFilters = {
  //   isBookable: false,
  //   isGreenEnergy: false,
  //   isCbPayment: false,
  //   isFreeCharging: false,
  //   isAvailable: false,
  //   supportsTwoWheel: false,
  // };
  const [filters, setFilters] = useState(initialFilters);
  const [connectorType, setconnectorType] = useState(null);

  const handleInputChange = (value, fieldName) => {
    setFilters(prevState => ({ ...prevState, [fieldName]: Number(value) }));
  };

  console.log('filters', filters);

  const powerRange = [
    // { value: '', label:'Type de connecteur'},
    { value: 22, label: '22kW' },
    { value: 24, label: '24kW' },
    { value: 7, label: '7kW' },
  ];
  const distanceRange = [
    // { value: '', label:'Type de connecteur'},
    { value: 10, label: '10Km' },
    { value: 50, label: '50Km' },
    { value: 100, label: '100Km' },
  ];

  const ConnectionTypes = [
    {
      FormalName: 'Avcon SAE J1772-2001',
      IsDiscontinued: true,
      IsObsolete: false,
      ID: 7,
      Title: 'Avcon Connector',
    },
    {
      FormalName: null,
      IsDiscontinued: null,
      IsObsolete: null,
      ID: 4,
      Title: 'Blue Commando (2P+E)',
    },
    {
      FormalName: 'IEC 62196-3 Configuration FF',
      IsDiscontinued: false,
      IsObsolete: false,
      ID: 33,
      Title: 'CCS (Type 2)',
    },
    {
      FormalName: null,
      IsDiscontinued: false,
      IsObsolete: false,
      ID: 16,
      Title: 'CEE 3 Pin',
    },
    {
      FormalName: null,
      IsDiscontinued: false,
      IsObsolete: false,
      ID: 17,
      Title: 'CEE 5 Pin',
    },
    {
      FormalName: 'CEE 7/4',
      IsDiscontinued: false,
      IsObsolete: false,
      ID: 28,
      Title: 'CEE 7/4 - Schuko - Type F',
    },
    {
      FormalName: null,
      IsDiscontinued: false,
      IsObsolete: false,
      ID: 23,
      Title: 'CEE 7/5',
    },
    {
      FormalName: 'IEC 62196-3 Configuration AA',
      IsDiscontinued: null,
      IsObsolete: null,
      ID: 2,
      Title: 'CHAdeMO',
    },
    {
      FormalName: 'Europlug 2-Pin (CEE 7/16)',
      IsDiscontinued: false,
      IsObsolete: false,
      ID: 13,
      Title: 'Europlug 2-Pin (CEE 7/16)',
    },
    {
      FormalName: 'IEC 60309 3-pin',
      IsDiscontinued: false,
      IsObsolete: false,
      ID: 34,
      Title: 'IEC 60309 3-pin',
    },
    {
      FormalName: null,
      IsDiscontinued: false,
      IsObsolete: false,
      ID: 36,
      Title: 'SCAME Type 3A (Low Power)',
    },
    {
      FormalName: 'IEC 62196-2 Type 3',
      IsDiscontinued: false,
      IsObsolete: false,
      ID: 26,
      Title: 'SCAME Type 3C (Schneider-Legrand)',
    },
    {
      FormalName: null,
      IsDiscontinued: false,
      IsObsolete: false,
      ID: 30,
      Title: 'Tesla (Model S/X)',
    },
    {
      FormalName: 'Tesla Connector',
      IsDiscontinued: true,
      IsObsolete: false,
      ID: 8,
      Title: 'Tesla (Roadster)',
    },
    {
      FormalName: 'Tesla Supercharger',
      IsDiscontinued: false,
      IsObsolete: false,
      ID: 27,
      Title: 'Tesla Supercharger',
    },
    {
      FormalName: 'SAE J1772-2009',
      IsDiscontinued: null,
      IsObsolete: null,
      ID: 1,
      Title: 'Type 1 (J1772)',
    },
    {
      FormalName: 'IEC 62196-2 Type 2',
      IsDiscontinued: false,
      IsObsolete: false,
      ID: 25,
      Title: 'Type 2 (Socket Only)',
    },
    {
      FormalName: 'IEC 62196-2',
      IsDiscontinued: false,
      IsObsolete: false,
      ID: 1036,
      Title: 'Type 2 (Tethered Connector) ',
    },
    {
      FormalName: 'Not Specified',
      IsDiscontinued: null,
      IsObsolete: null,
      ID: 0,
      Title: 'Unknown',
    },
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
      <Row>
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
                      <Col md='12'>
                        <label>Type de prise</label>
                        <Form.Control
                          aria-label='Type de prise'
                          as='select'
                          custom
                          name='standard'
                          onChange={e => setconnectorType(e.target.value)}
                        >
                          {/* <option defaultValue=''>Type de connecteur</option> */}
                          {ConnectionTypes.map((option, idx) => (
                            <option key={idx} value={option.ID}>
                              {option.Title}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                    <Row>
                      <Col md='6'>
                        <ButtonGroup className='mb-2'>
                          <ToggleButton
                            id='toggle-check'
                            type='checkbox'
                            variant='secondary'
                            checked={filters.is_operational}
                            name='isAvailable'
                            onChange={e =>
                              setFilters(prevState => ({
                                ...prevState,
                                is_operational: !filters.is_operational,
                              }))
                            }
                          >
                            Live
                          </ToggleButton>
                        </ButtonGroup>
                      </Col>
                      <Col md='6'>
                        {/* <label>Vérifié récemment</label> */}
                        <ButtonGroup className='mb-2'>
                          <ToggleButton
                            id='toggle-check'
                            type='checkbox'
                            variant='secondary'
                            checked={filters.recently_verified}
                            onChange={e =>
                              setFilters(prevState => ({
                                ...prevState,
                                recently_verified: !filters.recently_verified,
                              }))
                            }
                          >
                            Vérifié récemment
                          </ToggleButton>
                        </ButtonGroup>
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
      </Row>
      <Map filters={filters} connectiontypeid={connectorType} />
      {/* <div ref={ref} style={{ height: '300px', width: '500px' }} /> */}
    </>
  );
}

export default Maps;
