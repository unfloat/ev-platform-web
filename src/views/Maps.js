import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { getLocations } from '../actions/locationAction';
import { Dropdown, Row, Col, Form } from 'react-bootstrap';
import { getConnectors } from '../actions/connectorAction';
import { StandaloneSearchBox, LoadScript } from '@react-google-maps/api';

import { InfoBox } from '@react-google-maps/api';

function Maps({ locations, getLocations, connectors, getConnectors }) {
  const mapRef = useRef(null);
  const mountRef = useRef(false);

  function handleLoad() {}

  function hanldePlacesChanged() {}

  function filterByConnectorFormat() {}

  useEffect(() => {
    getLocations();
    getConnectors();

    const google = window.google;
    let map = mapRef.current;
    const lat = '47.188';
    const lng = '8.518';
    const myLatlng = new google.maps.LatLng(lat, lng);
    const mapOptions = {
      zoom: 8,
      center: myLatlng,
      scrollwheel: false,
      zoomControl: true,
    };
    mapRef.current = new google.maps.Map(map, mapOptions);
  }, [getLocations, getConnectors, mapRef]);

  useEffect(() => {
    if (mountRef.current) {
      const google = window.google;
      let map = mapRef.current;
      console.log('Mounted map', map);

      const markers = [];
      console.log('locations', locations, 'connectors', connectors);
      for (const location of locations) {
        markers.push(
          new google.maps.Marker({
            position: new window.google.maps.LatLng(
              location.coordinates.latitude,
              location.coordinates.longitude
            ),
            map: map,
            animation: google.maps.Animation.DROP,
            title: location.station_name,
            info: `Status: ${location.station_name}`,
            // label: location.is_green_energy
            //   ? google.maps.MarkerLabel('green')
            //   : google.maps.MarkerLabel('red'),
          })
        );
        // ? 'green' : 'non green',
      }
      // for (const marker of markers) {
      //   const infoBox = new google.maps.InfoBox(marker.info);
      //   google.maps.event.addListener(marker, 'click', function () {
      //     infoBox.open(map, marker);
      //   });
      // }
    } else {
      mountRef.current = true;
    }
  }, [locations, connectors]);

  return (
    <>
      <Row>
        <Dropdown className='mr-2 ml-2 mb-1'>
          <Dropdown.Toggle variant='default' id='dropdown-basic'>
            Pays
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {locations.map(location => {
              return (
                <Dropdown.Item
                  value={location.is_green_energy}
                  onClick={filterByConnectorFormat}
                >
                  {location.is_green_energy}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
      </Row>
      <div className='map-container'>
        <div id='map' ref={mapRef} />
      </div>
    </>
  );
}

const mapStateToProps = state => ({
  errors: state.errors,
  locations: state.location.locations,
  connectors: state.connector.connectors,
  loading: state.location.loading,
});

export default connect(mapStateToProps, { getLocations, getConnectors })(Maps);
