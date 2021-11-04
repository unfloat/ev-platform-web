import React, { useEffect, useRef, useState } from 'react';
import {
  getLocations,
  getLocationsByUserGeolocation,
  getLocationsByConnectorType,
} from '../../actions/locationAction';
import { connect } from 'react-redux';

import { Card, Modal, Button, Alert } from 'react-bootstrap';

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
  // const { latitude, longitude } = usePosition();
  const [markers, setMarkers] = useState([]);
  const [showModal, setshowModal] = useState(false);
  const [currentLocation, setcurrentLocation] = useState({});
  const [selectedLatLng, setselectedLatLng] = useState({
    latitude: 45.891181,
    longitude: 4.8223994,
  });

  //latitude: 49.2603667,
  // longitude: 3.0872607,

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

        marker.addListener('click', location => {
          setcurrentLocation(location);
          console.log('current location', location);

          setshowModal(true);
        });
        tmpMarkers.push(marker);
      });
    } else {
      console.log('selectedLatLng', selectedLatLng);
    }

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

  useEffect(() => {
    console.log('getLocations');
    getLocations();
  }, []);

  useEffect(() => {
    console.log('getLocationsByUserGeolocation');
    getLocationsByUserGeolocation({
      latitude: selectedLatLng.latitude,
      longitude: selectedLatLng.longitude,
      connectiontypeid,
    });
  }, [selectedLatLng, connectiontypeid]);

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
      // Create the initial InfoWindow.
      let infoWindow = new window.google.maps.InfoWindow({
        content: 'Cliquez où vous voulez chercher votre borne',
        position: myLatlng,
      });
      infoWindow.open(carte);
      carte.addListener('click', mapsMouseEvent => {
        console.log('mapsMouseEvent', mapsMouseEvent.latLng.toJSON().lat);
        setselectedLatLng({
          latitude: mapsMouseEvent.latLng.toJSON().lat,
          longitude: mapsMouseEvent.latLng.toJSON().lng,
        });

        // setshowModal(true);

        console.log('selectedLatLng', selectedLatLng);
        setcurrentLocation({});
      });

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
          loc => loc.UsageType.IsPayAtLocation === filters.is_pay_at_location
        );
        addMarkers(filterdLoc, carte);
      }

      addMarkers(filterdLoc, carte);
    }
  }, [filters]);

  return (
    <>
      {currentLocation ? (
        <Modal
          show={showModal}
          onHide={() => setshowModal(false)}
          className='search-modal text-center modal fade'
        >
          <Modal.Body>
            <Card>
              <Card.Body>
                <Button
                  onClick={e => console.log('reservation', currentLocation)}
                >
                  Réserver
                </Button>
              </Card.Body>
            </Card>
          </Modal.Body>
        </Modal>
      ) : (
        <hr />
      )}

      <div>
        {loading ? (
          <div>
            <Alert variant='info'>
              <span>Recherche des stations ...</span>
            </Alert>
          </div>
        ) : (
          <Alert variant='info'>
            <span>Cliquez sur la carte pour chercher des stations</span>
          </Alert>
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
// export default React.forwardRef((props, ref) => (
//   <ConnectedMap {...props} forwaredRef={ref} />
// ));
