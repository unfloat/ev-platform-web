import React, { useEffect, useRef, useState } from 'react';
import {
  getLocations,
  getLocationsByUserGeolocation,
  getLocationsByConnectorType,
} from '../../actions/locationAction';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { usePosition } from './../../hooks/usePosition';

import {
  Card,
  Modal,
  Button,
  Alert,
  ListGroupItem,
  ListGroup,
  Row,
  Col,
} from 'react-bootstrap';

const Map = ({
  locations,
  getLocations,
  getLocationsByUserGeolocation,
  getLocationsByConnectorType,
  filters,
  connectiontypeid,
  loading,
}) => {
  const [carte, setCarte] = useState();
  const ref = useRef(null);
  const history = useHistory();

  // const { latitude, longitude } = usePosition();
  const [markers, setMarkers] = useState([]);
  const [showModal, setshowModal] = useState(false);
  const [currentLocation, setcurrentLocation] = useState({});
  const [selectedLatLng, setselectedLatLng] = useState({
    latitude: 45.891181,
    longitude: 4.8223994,
  });
  const [reservation, setreservation] = useState(false);

  //  removes markers from map
  const removeMarkers = markersArray => {
    markersArray?.forEach(marker => marker.setMap(null));
    setMarkers([]);
  };

  // add markers to the map after getting/filtering locations
  const addMarkers = (locs, mapInstance) => {
    removeMarkers(markers);
    const tmpMarkers = [];
    const bounds = new window.google.maps.LatLngBounds();
    //45.891181, 4.8223994

    if (locs.length > 0) {
      locs.map(location => {
        bounds.extend(
          new window.google.maps.LatLng(
            location.AddressInfo.Latitude,
            location.AddressInfo.Longitude
          )
        );
        // Initialize marker
        const marker = new window.google.maps.Marker({
          position: new window.google.maps.LatLng(
            location.AddressInfo.Latitude,
            location.AddressInfo.Longitude
          ),
          title: location.AddressInfo.Title,
        });
        marker.setMap(mapInstance);

        marker.addListener('click', () => {
          setcurrentLocation(location);
          console.log('current location', location);

          setshowModal(true);
        });
        tmpMarkers.push(marker);
        // Create the initial InfoWindow.
        // if (selectedLatLng) {
        //   let infoWindow = new window.google.maps.InfoWindow({
        //     content: 'Cliquez où vous voulez chercher votre borne',
        //     position: selectedLatLng,
        //   });
        //   infoWindow.open(mapInstance);
        //   mapInstance.addListener('click', mapsMouseEvent => {
        //     console.log('mapsMouseEvent', mapsMouseEvent.latLng.toJSON().lat);
        //     infoWindow.close();
        //     setselectedLatLng({
        //       latitude: mapsMouseEvent.latLng.toJSON().lat,
        //       longitude: mapsMouseEvent.latLng.toJSON().lng,
        //     });

        //     // setshowModal(true);

        //     console.log('selectedLatLng', selectedLatLng);
        //     setcurrentLocation({});
        //   });
        //}
      });
    } else {
      console.log('selectedLatLng', selectedLatLng);
    }

    setMarkers(tmpMarkers);
    mapInstance.fitBounds(bounds);
  };
  const reserver = () => {
    history.push('/admin/reserver');
  };

  // Initialize map
  useEffect(() => {
    const onLoad = () => {
      try {
        const options = {
          lat: 45.891181, //latitude
          lng: 4.8223994, // longitude
        };
        const _map = new window.google.maps.Map(ref.current, {
          center: options,
          zoom: 10,
        });
        setCarte(_map);
      } catch (err) {
        console.log(err);
      }
    };

    if (!window.google) {
      const script = document.createElement(`script`);
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBwo-QDe0-NuBA5EZSM9UiyAnTYok74maU`;
      document.head.append(script);
      script.addEventListener(`load`, onLoad);
    } else onLoad();
  }, []);

  // Geocoding
  // useEffect(() => {
  //   const onGeocode = () => {
  //     try {
  //       const geocoder = new window.google.maps.Geocoder();
  //       geocoder.geocode({ address: 'paris' }, (results, status) => {
  //         if (status == 'OK') {
  //           carte.setCenter(results[0].geometry.location);
  //           const marker = new window.google.maps.Marker({
  //             map: carte,
  //             position: results[0].geometry.location,
  //           });
  //         } else {
  //           alert(
  //             'Geocode was not successful for the following reason: ' + status
  //           );
  //         }
  //       });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   if (!window.google) {
  //     const script = document.createElement(`script`);
  //     script.src = `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAhobSlTjGBQSW4nfojOb8T7PFvVN8hG94`;
  //     document.head.append(script);
  //     script.addEventListener(`load`, onGeocode);
  //   } else onGeocode();
  // return () => {
  //   cleanup;
  // };
  // }, []);

  useEffect(() => {
    console.log('getLocations');
    getLocations();
  }, []);

  // useEffect(() => {
  //   console.log('getLocationsByUserGeolocation');
  //   getLocationsByUserGeolocation({
  //     selectedLatLng,
  //   });
  // }, [selectedLatLng]);

  useEffect(() => {
    console.log('getLocationsByConnectorType');

    getLocationsByConnectorType(connectiontypeid);
  }, [connectiontypeid]);

  // Drop Markers
  useEffect(() => {
    if (locations.length > 0 && carte) {
      console.log(currentLocation);
      addMarkers(locations, carte);
      const myLatlng = { lat: 49.2603667, lng: 3.0872607 };
      // .renderingType != 'UNINITIALIZED'
    }
  }, [locations, carte]);

  // Map Filter
  useEffect(() => {
    let filterdLoc = locations;
    if (carte && locations.length > 0) {
      if (filters.recently_verified) {
        filterdLoc = locations.filter(
          loc => loc.IsRecentlyVerified === filters.recently_verified
        );
        addMarkers(filterdLoc, carte);
      }
      if (filters.is_operational) {
        filterdLoc = locations.filter(
          loc => loc.StatusType.IsOperational === filters.is_operational
        );
        addMarkers(filterdLoc, carte);
      }
      if (filters.is_pay_at_location) {
        filterdLoc = locations.filter(
          loc => loc.UsageType?.IsPayAtLocation === filters.is_pay_at_location
        );
        addMarkers(filterdLoc, carte);
      }
      if (filters.is_membership_required) {
        filterdLoc = locations.filter(
          loc =>
            loc.UsageType?.IsMembershipRequired ===
            filters.is_membership_required
        );
        addMarkers(filterdLoc, carte);
      }

      addMarkers(filterdLoc, carte);
    }
  }, [filters]);

  return (
    <>
      {currentLocation.AddressInfo ? (
        <Modal
          show={showModal}
          onHide={() => setshowModal(false)}
          className='search-modal text-center modal fade'
        >
          <Modal.Body>
            <Card>
              <Card.Body>
                <Card.Title>{currentLocation.AddressInfo.Title}</Card.Title>
                <br />
                <Card.Subtitle>
                  {currentLocation.AddressInfo.AddressLine1}
                </Card.Subtitle>

                <Row>
                  <Col>
                    {currentLocation.AddressInfo.StateOrProvince},
                    {currentLocation.AddressInfo.Postcode}
                  </Col>
                </Row>
                <Row>
                  <Col> {currentLocation.AddressInfo.Town}</Col>
                </Row>
                <Row>
                  <Col>
                    <p> Prix de recharge: {currentLocation.UsageCost}</p>
                  </Col>
                </Row>

                {currentLocation.Connections.map(connection => (
                  <>
                    <Row>
                      <Col>{connection.ConnectionType.FormalName}</Col>
                    </Row>
                    <Row>
                      <Col>
                        <p> {connection.CurrentType.Title}</p>
                      </Col>
                      <Col>
                        <p>
                          {connection.ConnectionType.IsDiscontinued
                            ? 'Connexion Indirecte'
                            : 'Connexion Directe'}
                        </p>
                      </Col>
                      <Col>
                        <p> Ampérage {connection.Amps ?? 'inconnu'}</p>
                      </Col>
                      <Col>
                        <p> Voltage {connection.Voltage ?? ' inconnu'}</p>
                      </Col>
                      <Col>
                        <p>
                          {' '}
                          Puissance par kWh {connection.PowerKW ?? ' inconnue'}
                        </p>{' '}
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <small className='text-muted'>
                          Commentaires de recharge:
                          {connection.Level?.Comments ?? 'Aucun'}
                        </small>
                      </Col>
                    </Row>
                  </>
                ))}
                {currentLocation.OperatorInfo?.WebsiteURL}
              </Card.Body>
              <Card.Footer>
                <Button
                  onClick={e => {
                    setreservation(currentLocation);
                    setshowModal(false);
                  }}
                >
                  Réserver
                </Button>
              </Card.Footer>
            </Card>
          </Modal.Body>
        </Modal>
      ) : (
        <></>
      )}

      <div>
        {loading ? (
          <div>
            <Alert variant='info'>
              <span>Recherche des stations ...</span>
            </Alert>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div>
        {reservation ? (
          <div>
            <Alert variant='info'>
              <span>{reservation.AddressInfo.Title} réservée</span>
            </Alert>
          </div>
        ) : (
          <hr />
        )}
      </div>
      <div
        style={{ height: `60vh`, margin: `1em 0`, borderRadius: `0.5em` }}
        ref={ref}
      />
    </>
  );
};

// Map.defaultProps = mapOptions;
const mapStateToProps = state => ({
  errors: state.errors,
  locations: state.location.locations,
  loading: state.location.loading,
});

// export default ;
export default connect(mapStateToProps, {
  getLocations,
  getLocationsByUserGeolocation,
  getLocationsByConnectorType,
})(Map);
