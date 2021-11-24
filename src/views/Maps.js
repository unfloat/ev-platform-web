import React, { useRef, useState, useEffect } from 'react';
// UI components
import Map from '../components/msp/Map';
import {
  Card,
  ButtonGroup,
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  ToggleButton,
} from 'react-bootstrap';

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
    recently_verified: false,
    is_operational: true,
    is_membership_required: false,
    bookable: false,
    // free_charging: false,
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
  const [filterParameters, setfilterParameters] = useState(filters);

  const [connectorType, setconnectorType] = useState();
  const [connector, setconnector] = useState();

  const [address, setaddress] = useState('paris');
  const [adressProperty, setadressProperty] = useState('');

  const [openDropdown, setopenDropdown] = useState(false);

  const handleInputChange = (value, fieldName) => {
    setFilters(prevState => ({ ...prevState, [fieldName]: value }));
  };

  console.log('address', address);
  console.log('adressProperty', adressProperty);

  const powerRange = [
    { value: 22, label: '22kW' },
    { value: 24, label: '24kW' },
    { value: 7, label: '7kW' },
  ];
  const distanceRange = [
    { value: 10, label: '10Km' },
    { value: 50, label: '50Km' },
    { value: 100, label: '100Km' },
  ];

  const ConnectionTypes = [
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
      FormalName: 'IEC 62196-2 Type 3',
      IsDiscontinued: false,
      IsObsolete: false,
      ID: 26,
      Title: 'SCAME Type 3C (Schneider-Legrand)',
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

  return (
    <>
      <Row>
        <Container fluid>
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <Form onSubmit={e => e.preventDefault()}>
                    <Row>
                      <Col md='12'>
                        {/* <FormGroup> */}
                        <label>Rechercher par adresse</label>
                        <div>
                          <Form.Control
                            bsSize='lg'
                            placeholder='Adresse'
                            type='text'
                            name='address'
                            onChange={e => {
                              setadressProperty(e.target.value);
                              console.log('e.target.value', e.target.value);
                            }}
                          />
                        </div>
                      </Col>
                    </Row>
                    {/* <Row>
                      <Col md='12'>
                        <label>Type de prise</label>
                        <Form.Control
                          aria-label='Type de prise'
                          as='select'
                          custom
                          name='standard'
                          onChange={e => setconnectorType(e.target.value)}
                        >
                          //  <option defaultValue=''>Type de connecteur</option> 
                          {ConnectionTypes.map((option, idx) => (
                            <option key={idx} value={option.ID}>
                              {option.Title}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                     */}
                    {/* <Row>
                      <Col md='6'>
                        {/* <Col md='4'> 
                        <Form.Check
                          type='switch'
                          id='bookable-switch'
                          label='Reservation'
                          value={filters.bookable}
                          name='bookable'
                          onChange={e =>
                            handleInputChange(e.target.value, e.target.name)
                          }
                        />
                        <Form.Check
                          type='switch'
                          id='recently_verified-switch'
                          label='Vérification récente'
                          value={filters.recently_verified}
                          name='recently_verified'
                          onChange={e =>
                            handleInputChange(e.target.value, e.target.name)
                          }
                        />
                        {/* <Form.Check
                          type='switch'
                          id='free_charging-switch'
                          label='Recharge gratuite'
                          value={filters.free_charging}
                          name='free_charging'
                          onChange={e =>
                            handleInputChange(e.target.value, e.target.name)
                          }
                        /> 
                        <Form.Check
                          type='switch'
                          id='is_membership_required-switch'
                          label='Avec abonnement'
                          value={filters.is_membership_required}
                          name='is_membership_required'
                          onChange={e =>
                            setFilters(prevState => ({
                              ...prevState,
                              is_membership_required:
                                !filters.is_membership_required,
                            }))
                          }
                        />
                      </Col>
                    </Row> */}
                    <Row>
                      <Col md='2'>
                        <Button
                          color='primary'
                          className='mt-4'
                          disabled={adressProperty.length == 0}
                          onClick={e => {
                            setaddress(adressProperty);

                            e.preventDefault();
                          }}
                        >
                          Rechercher
                        </Button>
                      </Col>
                      {/* <Col md='1'>
                        <Button
                          color='primary'
                          className='mt-4'
                          onClick={() => {
                            // setfilterParameters(initialFilters);
                            setaddress('paris');
                            setadressProperty('');
                            // setconnector(33);
                          }}
                        >
                          Réinitialiser
                        </Button> 
                      </Col>*/}
                    </Row>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Map address={address} />
        </Container>
      </Row>

      {/* <div ref={ref} style={{ height: '300px', width: '500px' }} /> */}
    </>
  );
}

export default Maps;
