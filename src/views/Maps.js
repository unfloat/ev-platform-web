import React, { useRef, useState, useEffect } from 'react';
// UI components
import Map from '../components/msp/Map';
import {
  CardHeader,
  Card,
  ButtonGroup,
  CardBody,
  Container,
  Row,
  Col,
  Form,
  CardTitle,
  Button,
  Alert,
  FormGroup,
  Input,
  Label,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

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
    is_pay_at_location: false,
    is_membership_required: false,
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

  const [connectorType, setconnectorType] = useState();
  const [connector, setconnector] = useState();

  const [address, setaddress] = useState();
  const [adressProperty, setadressProperty] = useState();

  const [openDropdown, setopenDropdown] = useState(false);

  // const handleInputChange = (value, fieldName) => {
  //   setadressProperty(prevState => ({ ...prevState, [fieldName]: value }));
  // };

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
                <CardHeader>
                  <CardTitle as='h4'>Filtrer les stations par:</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={e => e.preventDefault()}>
                    <Row>
                      <Col md='12'>
                        {/* <FormGroup> */}
                        <label>Adresse</label>
                        <div>
                          <Input
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
                        {/* <FormControl
                          aria-label='Type de prise'
                          as='select'
                          custom
                          name='standard'
                          onChange={e => setconnectorType(e.target.value)}
                        >
                          {/* <option defaultValue=''>Type de connecteur</option> 
                          {ConnectionTypes.map((option, idx) => (
                            <option key={idx} value={option.ID}>
                              {option.Title}
                            </option>
                          ))}
                        </FormControl> 

                        <Dropdown
                          toggle={e => {
                            setopenDropdown(!openDropdown);
                          }}
                          isOpen={openDropdown}
                        >
                          <DropdownToggle caret>Type de prise</DropdownToggle>
                          <DropdownMenu>
                            {ConnectionTypes.map((option, idx) => (
                              <DropdownItem
                                key={idx}
                                onClick={e => {
                                  setconnectorType(option.ID);
                                  e.preventDefault();
                                }}
                              >
                                {option.Title}
                              </DropdownItem>
                            ))}
                          </DropdownMenu>
                        </Dropdown>
                      </Col>
                    </Row> */}

                    <Row>
                      <Col md='4'>
                        {/* <ButtonGroup className='mb-2'>
                          <ToggleButton
                            id='toggle-check'
                            type='checkbox'
                            variant='secondary'
                            checked={filters.is_pay_at_location}
                            name='is_pay_at_location'
                            onChange={e =>
                              setFilters(prevState => ({
                                ...prevState,
                                is_pay_at_location: !filters.is_pay_at_location,
                              }))
                            }
                          >
                            Paiement sur place
                          </ToggleButton>
                        </ButtonGroup> */}
                        <FormGroup check inline>
                          <Input className='checkbox' type='checkbox' />
                          <Label check>Some input</Label>
                        </FormGroup>
                      </Col>
                      <Col md='4'>
                        {/* <label>Vérifié récemment</label> */}
                        {/* <ButtonGroup className='mb-2'>
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
                            Mis à jour
                          </ToggleButton>
                        </ButtonGroup> */}
                        <FormGroup check inline>
                          <Input type='checkbox' />
                          <Label check>Some input</Label>
                        </FormGroup>
                      </Col>
                      <Col md='4'>
                        {/* <label>Vérifié récemment</label> */}
                        {/* <ButtonGroup className='mb-2'>
                          <ToggleButton
                            id='toggle-check'
                            type='checkbox'
                            variant='secondary'
                            checked={filters.is_membership_required}
                            onChange={e =>
                              setFilters(prevState => ({
                                ...prevState,
                                is_membership_required:
                                  !filters.is_membership_required,
                              }))
                            }
                          >
                            Avec abonnement
                          </ToggleButton>
                        </ButtonGroup> */}
                        <FormGroup check inline>
                          <Input type='checkbox' />
                          <Label check>Some input</Label>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Button
                      color='primary'
                      className='mt-4'
                      onClick={e => {
                        setaddress(adressProperty);
                        setconnector(connectorType);
                        console.log(
                          adressProperty,
                          'adressProperty',
                          address,
                          'address',
                          connectorType,
                          'connectorType'
                        );

                        e.preventDefault();
                      }}
                    >
                      Rechercher
                    </Button>
                    <Button
                      color='primary'
                      className='mt-4'
                      onClick={() => {
                        setFilters(initialFilters);
                        setaddress('paris');
                        setconnector(33);
                      }}
                    >
                      Réinitialiser
                    </Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Map
            address={address}
            filters={filters}
            connectiontypeid={connectorType}
          />
        </Container>
      </Row>

      {/* <div ref={ref} style={{ height: '300px', width: '500px' }} /> */}
    </>
  );
}

export default Maps;
