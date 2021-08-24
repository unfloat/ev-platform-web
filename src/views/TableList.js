import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getLocations } from '../actions/locationAction';

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from 'react-bootstrap';

function TableList({ loading, locations, getLocations }) {
  const mountRef = React.useRef(false);
  useEffect(() => {
    getLocations();
  });
  useEffect(() => {
    if (mountRef.current) {
      console.log(locations);
    } else {
      mountRef.current = true;
    }
  }, [locations]);
  return (
    <>
      <Container fluid>
        <Row>
          <Col md='12'>
            <Card className='strpied-tabled-with-hover'>
              <Card.Header>
                <Card.Title as='h4'>Locations</Card.Title>
                <p className='card-category'>Locations</p>
              </Card.Header>
              <Card.Body className='table-full-width table-responsive px-0'>
                <Table className='table-hover table-striped'>
                  <thead>
                    <tr>
                      <th className='border-0'>Station</th>
                      <th className='border-0'>Pays</th>
                      <th className='border-0'>Adresse</th>
                      <th className='border-0'>Type de puissance</th>
                      <th className='border-0'>Mise à jour le</th>
                      <th className='border-0'>Opérateur</th>
                    </tr>
                  </thead>
                  <tbody>
                    {locations?.data?.length &&
                      locations?.data?.map(location => {
                        console.log(location);
                        return (
                          <tr key={location.name}>
                            <td>{location.name}</td>
                            <td>{location.city}</td>
                            <td>{location.address}</td>
                            <td>
                              {location.is_green_energy
                                ? 'Energie verte'
                                : 'Energie non verte'}
                            </td>
                            <td>
                              {location.opening_times.twentyfourseven
                                ? 'Horaire'
                                : '24/24'}
                            </td>
                            <td>{location.operator.name}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

const mapStateToProps = state => ({
  errors: state.errors,
  locations: state.location.locations,
  loading: state.location.loading,
});

export default connect(mapStateToProps, { getLocations })(TableList);
