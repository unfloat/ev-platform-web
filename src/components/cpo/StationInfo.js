import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Card,
  Form,
  CardGroup,
  Container,
  Row,
  Col,
} from 'react-bootstrap';

function StationInfo(params) {
  return (
    <div className='app flex-row align-items-center'>
      <Container>
        <Row className='justify-content-center'>
          <Col md='8'>
            <Card>
              <Card.Header>
                <Card.Title as='h4'>Information</Card.Title>
              </Card.Header>
              <Card.Body></Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default StationInfo;
