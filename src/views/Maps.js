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

// constants
import greenEnergyTypeOptions from './../constants/greenEnergyTypes';
import bookableOptions from './../constants/bookable';
import paymentOptions from './../constants/payment';

function Maps() {
  const initialFilters = '';
  const [filter, setFilters] = useState(initialFilters);

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
                  <div>
                    <Form.Check
                      type='radio'
                      id='isGreenEneergy-switch'
                      label='Energie verte'
                      value='isGreenEnergy'
                      name="filter-type"
                      onChange={e => setFilters(e.target.value)}
                    />
                    <Form.Check
                      type='radio'
                      id='isBookable-switch'
                      label='Réservable'
                      value='isBookable'
                      name="filter-type"
                      onChange={e =>setFilters(e.target.value)}
                    />

                    <Form.Check
                      type='radio'
                      id='isCredit-switch'
                      value='isCbPayment'
                      name="filter-type"
                      label='Paiement par carte bancaire'
                      onChange={e =>setFilters(e.target.value)}
                    />
                  </div>
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
      <Map filters={filter} />
    </>
  );
}

export default Maps;
