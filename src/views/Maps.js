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
  const initialFilters = {
    isGreenEneergy:false,
    isBookable:false,
    isCredit: false,
  };
  const [filters, setFilters] = useState(initialFilters);

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
                    <Col>
                      <Form.Check
                        type='switch'
                        id='isGreenEneergy-switch'
                        label='Energie verte'
                        checked={filters.isGreenEneergy}
                        onChange={e => setFilters(prev => ({...prev, isGreenEneergy: !prev.isGreenEneergy}))}
                      />
                    </Col>
                    <Col>
                      <Form.Check
                        type='switch'
                        id='isBookable-switch'
                        label='Réservable'
                        checked={filters.isBookable}
                        onChange={e => setFilters(prev => ({...prev, isBookable: !prev.isBookable}))}
                      />
                    </Col>
                    <Col>
                      <Form.Check
                        type='switch'
                        id='isCredit-switch'
                        label='Paiement par carte bancaire'
                        checked={filters.isCredit}
                        onChange={e => setFilters(prev => ({...prev, isCredit: !prev.isCredit}))}
                      />
                    </Col>
                  </Row>
                  <Button color='primary' className='mt-4' onClick={() => setFilters(initialFilters)}>
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
