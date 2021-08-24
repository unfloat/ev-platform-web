import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addVehicule } from '../actions/vehiculeActions';

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from 'react-bootstrap';

function Vehicule({ vehicules, loading }) {
  const [vehiculeProperties, setvehiculeProperties] = useState({
    brand: '',
    model: '',
  });

  const handleInputChange = (value, fieldName) => {
    setvehiculeProperties(prevState => ({ ...prevState, [fieldName]: value }));
  };

  const _addVehicule = () => {
    if (!vehiculeProperties.brand && !vehiculeProperties.model) return;
    addVehicule(vehiculeProperties);
  };

  const mountRef = React.useRef(false);
  return (
    <>
      <Container fluid>
        <Row>
          <Col md='8'>
            <Card>
              <Card.Header>
                <Card.Title as='h4'>Edit Vehicule</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className='pr-1' md='5'>
                      <Form.Group>
                        <label>Brand</label>
                        <Form.Control
                          placeholder='Company'
                          type='text'
                          name='brand'
                          onChange={e =>
                            handleInputChange(e.target.value, e.target.name)
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col className='pr-1' md='5'>
                      <Form.Group>
                        <label>Model</label>
                        <Form.Control
                          placeholder='Company'
                          type='text'
                          name='model'
                          onChange={e =>
                            handleInputChange(e.target.value, e.target.name)
                          }
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Button className='btn-fill pull-right' type='submit' variant='info'>
          Update Vehicule
        </Button>
      </Container>{' '}
    </>
  );
}

const mapStateToProps = state => ({
  errors: state.errors,
  vehicules: state.vehicule.vehicules,
  loading: state.vehicule.loading,
});

export default connect(mapStateToProps, { addVehicule })(Vehicule);
