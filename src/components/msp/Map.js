import React, { useEffect, useRef, useState } from 'react';
import {
  getLocations,
  getLocationsByUserGeolocation,
  getLocationsByConnectorType,
} from '../../actions/locationAction';
import { connect } from 'react-redux';
import { Modal, Card } from 'react-bootstrap';

const Map = ({
  options,
  locations,
  getLocations,
  getLocationsByUserGeolocation,
  getLocationsByConnectorType,
  filters,
  connectiontypeid,
}) => {
  const [map, setMap] = useState();
  const ref = useRef(null);
  // const { latitude, longitude } = usePosition();
  const [markers, setMarkers] = useState([]);
  const [showModal, setshowModal] = useState(false);
  const [currentLocation, setcurrentLocation] = useState({});
  const [selectedLatLng, setselectedLatLng] = useState({});

  //latitude: 49.2603667,
  // longitude: 3.0872607,

  //  removes markers from map
  const removeMarkers = markersArray => {
    markersArray?.forEach(marker => marker.setMap(null));
    setMarkers([]);
  };

  const addMarkers = (locs, mapInstance) => {
    removeMarkers(markers);
    const tmpMarkers = [];
    const bounds = new window.google.maps.LatLngBounds();

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
        setshowModal(prev => !prev);
        setcurrentLocation(location);
      });

      // selectedLatLng
      //   ? bounds.extend(new window.google.maps.LatLng(selectedLatLng))
      //   : bounds.extend(
      //       new window.google.maps.LatLng(
      //         location.AddressInfo.Latitude,
      //         location.AddressInfo.Longitude
      //       )
      //     );
      tmpMarkers.push(marker);
    });

    setMarkers(tmpMarkers);
    mapInstance.fitBounds(bounds);
  };

  // Initialize map
  useEffect(() => {
    const onLoad = () => {
      try {
        const options = {
          lat: 45.891181, //45.891181
          lng: 7, // 4.8223994
        };
        const _map = new window.google.maps.Map(ref.current, {
          center: options,
          zoom: 6,
        });
        setMap(_map);
      } catch (err) {
        console.log(err);
      }
    };
    if (!window.google) {
      const script = document.createElement(`script`);
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBwo-QDe0-NuBA5EZSM9UiyAnTYok74maU`;
      document.head.append(script);
      script.addEventListener(`load`, onLoad);
      // return () => script.removeEventListener(`load`, onLoad);
    } else onLoad();
  }, []);

  useEffect(() => {
    getLocations();
  }, []);

  useEffect(() => {
    console.log('selectedLatLng', selectedLatLng);
    getLocationsByUserGeolocation(selectedLatLng);
    console.log('useEffect locations', locations);
  }, [selectedLatLng]);

  useEffect(() => {
    getLocationsByConnectorType(connectiontypeid);
    console.log(
      'useEffect locations connectiontypeid ',
      connectiontypeid,
      locations
    );
  }, [connectiontypeid]);

  // Drop Markers
  useEffect(() => {
    if (locations.length && map) {
      addMarkers(locations, map);

      // .renderingType != 'UNINITIALIZED'
      const myLatlng = { lat: 49.2603667, lng: 3.0872607 };
      // Create the initial InfoWindow.
      let infoWindow = new window.google.maps.InfoWindow({
        content: 'Click the map to get Lat/Lng!',
        position: myLatlng,
      });
      infoWindow.open(map);
      map.addListener('click', mapsMouseEvent => {
        console.log(mapsMouseEvent);
        setshowModal(prev => !prev);
        setcurrentLocation({});
        //Close the current InfoWindow.

        // Create a new InfoWindow.
      });
    }
  }, [locations, map]);

  // Map Filter
  useEffect(() => {
    let filterdLoc = locations;
    if (map && locations) {
      if (filters.recently_verified) {
        filterdLoc = locations.filter(
          loc => loc.IsRecentlyVerified === filters.recently_verified
        );
        addMarkers(filterdLoc, map);
      }
      if (filters.is_operational) {
        filterdLoc = locations.filter(
          loc => loc.StatusType.IsOperational === filters.is_operational
        );
        addMarkers(filterdLoc, map);
      }
      if (filters.is_pay_at_location) {
        filterdLoc = locations.filter(
          loc => loc.UsageType.IsPayAtLocation === filters.is_pay_at_location
        );
        addMarkers(filterdLoc, map);
      }

      addMarkers(filterdLoc, map);
    }
  }, [filters]);

  return (
    <>
      <div>
        <Modal
          show={showModal}
          onHide={() => setshowModal(prev => !prev)}
          className='search-modal text-center modal fade'
        >
          <Modal.Body>
            {currentLocation.AddressInfo ? (
              <Card className='card-user'>
                <Card.Body>
                  <div className='author'>
                    <a href='#pablo' onClick={e => e.preventDefault()}>
                      <img
                        alt='...'
                        className='avatar border-gray'
                        src={
                          require('assets/img/connectors/DOMESTIC_B.png')
                            .default
                        }
                      />
                    </a>
                  </div>
                  <Card.Title> {currentLocation.AddressInfo.Title}</Card.Title>
                  <Card.Subtitle className='mb-2 text-muted'>
                    {' '}
                    {currentLocation.ContactTelephone1}
                    <br />
                    {currentLocation.ContactTelephone2}
                    {currentLocation.ContactEmail}
                  </Card.Subtitle>
                  <Card.Text>
                    {currentLocation.AddressInfo.Town},
                    {currentLocation.AddressInfo.Postcode}
                    {currentLocation.AddressInfo.Latitude},{' '}
                    {currentLocation.AddressInfo.Longitude}
                    <br />
                    <>
                      {currentLocation.IsOperational
                        ? 'Opérationnelle'
                        : 'Non Opérationnelle'}
                    </>
                    <br />
                    <>
                      {currentLocation.IsRecentlyVerified
                        ? 'Vérifié récemment'
                        : 'Non vérifié récemment'}
                    </>{' '}
                    <br />
                    <Card.Link href={currentLocation.RelatedURL}>
                      Site web
                    </Card.Link>
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className='text-muted'>
                    Dernière mise à jour effectuée le:{' '}
                    {currentLocation.DateLastStatusUpdate}
                  </small>
                </Card.Footer>
              </Card>
            ) : (
              <div>
                <p>{'No current location'}</p>
              </div>
            )}
          </Modal.Body>
        </Modal>
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
// export default React.forwardRef((props, ref) => (
//   <ConnectedMap {...props} forwaredRef={ref} />
// ));
