import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { getLocations } from "../actions/locationAction"

// react-bootstrap components
import { Badge, Button, Navbar, Nav, Container } from "react-bootstrap";


function Maps({ locations, getLocations }) {
  const mapRef = React.useRef(null);
  const mountRef = React.useRef(false);
  useEffect(() => {
    getLocations();
  }, []);
  useEffect(() => {
    if (mountRef.current) {
      console.log(locations)
      let google = window.google;
      let map = mapRef.current;
      let lat = "47.179";
      let lng = "8.518";
      
      const myLatlng = new google.maps.LatLng(lat, lng);
      const mapOptions = {
        zoom: 13,
        center: myLatlng,
        scrollwheel: false,
        zoomControl: true,
      };

      map = new google.maps.Map(map, mapOptions);
      let markers = [];
      for (let loc of locations.data) {
        markers.push(
          new google.maps.Marker({
          position: new google.maps.LatLng(loc.coordinates.latitude, loc.coordinates.longitude),
          map: map,
          animation: google.maps.Animation.DROP,
          title: loc.name,
          info: `Status: ${loc.status}`,
          label: loc.google.maps.MarkerLabel()
        })
        );

      }
      for (const marker of markers) {
        const infowindow = new google.maps.InfoWindow({
          content: marker.info,
        });
        google.maps.event.addListener(marker, "click", function () {
          infowindow.open(map, marker);
        });
      }

      // new MarkerClusterer(map, markers, {
      //   imagePath:
      //     "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
      // });
    
    }
    else {
      mountRef.current = true;
    }

  }, [locations])


  return (
    <>
      <div className="map-container">
        <div id="map" ref={mapRef}></div>
      </div>
    </>
  );
}



const mapStateToProps = (state) => ({
  errors: state.errors,
  locations: state.location.locations,
  loading: state.location.loading,
});




export default connect(mapStateToProps, { getLocations })(Maps);
