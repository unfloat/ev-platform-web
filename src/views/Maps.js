import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { getLocations } from '../actions/locationAction';
// import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";

// react-bootstrap components
// import { Badge, Button, Navbar, Nav, Container } from 'react-bootstrap';

function Maps({ locations, getLocations }) {
  const mapRef = useRef(null);
  // const markerClustererRef = useRef(null)
  const mountRef = useRef(false);
  useEffect(() => {
    getLocations();
  });
  useEffect(() => {
    if (mountRef.current) {
      const google = window.google;
      let map = mapRef.current;
      // let markerClusterer = markerClustererRef.current
      const lat = '47.179';
      const lng = '8.518';

      const myLatlng = new google.maps.LatLng(lat, lng);
      const mapOptions = {
        zoom: 13,
        center: myLatlng,
        scrollwheel: false,
        zoomControl: true,
      };

      map = new google.maps.Map(map, mapOptions);
      const markers = [];
      for (const location of locations) {
        markers.push(
          new google.maps.Marker({
            position: new google.maps.LatLng(
              location.coordinates.latitude,
              location.coordinates.longitude
            ),
            map: map,
            animation: google.maps.Animation.DROP,
            title: location.name,
            info: `Status: ${location.status}`,
            // label: location[energy_mix][is_green_energy] ? google.maps.MarkerLabel('green') : google.maps.MarkerLabel('red'),
          })
        );
      }
      for (const marker of markers) {
        const infowindow = new google.maps.InfoWindow({
          content: marker.info,
        });
        google.maps.event.addListener(marker, 'click', function () {
          infowindow.open(map, marker);
        });
      }

      // markerClusterer = new MarkerClusterer(map, markers, {
      //   imagePath:
      //     'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
      //   gridSize: 30,
      //   minimumClusterSize: 5,
      // });
    } else {
      mountRef.current = true;
    }
  }, [locations]);

  return (
    <>
      <div className='map-container'>
        <div id='map' ref={mapRef}>
          {/* <div id='markerClusterer' ref={markerClustererRef} /> */}
        </div>
      </div>
    </>
  );
}

const mapStateToProps = state => ({
  errors: state.errors,
  locations: state.location.locations,
  loading: state.location.loading,
});

export default connect(mapStateToProps, { getLocations })(Maps);
