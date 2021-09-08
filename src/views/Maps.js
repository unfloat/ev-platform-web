import React, { useRef, useState } from 'react';
// data

// UI components
import { Form, Card, Container, Row, Col, Button } from 'react-bootstrap';
import Map from './../components/Map';
// constants
import greenEnergyTypeOptions from './../constants/greenEnergyTypes';
import connectorTypeOptions from './../constants/connectorTypes';
import connectorFormatOptions from './../constants/connectorFormat';
import connectorTypes from './../constants/connectorTypes';

function Maps() {
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
                <Form>
                  <Row>
                    <Col md='4'>
                      <Form.Control
                        aria-label='Connector select'
                        as='select'
                        custom
                        // onChange={e => setFilterName(e.target.value)}
                        onChange={e => setFilters(prevState => ({...prevState, energy: e.target.value}))}
                      >
                        <option defaultValue=''>Type d'Energie</option>
                        {greenEnergyTypeOptions.map((option, idx) => (
                          <option key={idx} value={option.value}>
                            {option.label}
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
                        // onChange={e =>
                        //   setFilterName(e.target.value, e.target.name)
                        // }
                        onChange={e => setFilters(prevState => ({...prevState, standard: e.target.value}))}
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
                    <Col md='4'>
                      <Form.Control
                        aria-label='Connector select'
                        as='select'
                        custom
                        name='format'
                        // onChange={e =>
                        //   setFilterName(e.target.value, e.target.name)
                        // }
                        onChange={e => setFilters(prevState => ({...prevState, format: e.target.value}))}
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
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Map filterName={filterName} filters={filters}>
          {/* {selectedStation && (
          <InfoBox
            onCloseClick={() => {
              setSelectedStation(null);
            }}
            position={{
              lat: parseFloat(selectedStation.coordinates.latitude),
              lng: parseFloat(selectedStation.coordinates.longitude),
            }}
          >
            <Card style={{ width: '18rem' }}>
              <Card.Img
                variant='top'
                src={require('assets/img/station.png').default}
              />
              <Card.Body>
                <Card.Title>{selectedStation.station_name}</Card.Title>
                <Card.Text>
                  {selectedStation.address + ' ' + selectedStation.address}
                </Card.Text>
                <Button variant='primary'>Go somewhere</Button>
              </Card.Body>
            </Card>
          </InfoBox>
        )} */}
        </Map>
      </Container>
    </>
  );
}

export default Maps;
