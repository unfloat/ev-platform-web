import React, { useRef, useState } from 'react';
// UI components
import MapGuest from '../components/guest/MapGuest';
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

// constants

function MapsGuest() {
  const [filters, setFilters] = useState({});

  // filters={filters}

  return (
    <>
      <Container>
        <Row className='justify-content-center'>
          <Col md='12'>
            <Card>
              <Card.Header>
                <Card.Title as='h3'>Carte des bornes de recharge</Card.Title>
                <br />
                <Card.Subtitle as='h4'>
                  Le plus court chemin vers la borne de recharge qu’il vous
                  faut.
                </Card.Subtitle>
              </Card.Header>
              <Card.Body>
                <MapGuest />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default MapsGuest;
