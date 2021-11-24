import React, { useEffect, useRef, useState } from 'react';
import {
  getLocations,
  getLocationsByUserGeolocation,
} from '../../actions/locationAction';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { usePosition } from 'hooks/usePosition';

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

function MapGuest({
  locations,
  getLocations,
  getLocationsByUserGeolocation,
  loading,
}) {
  const ref = useRef();
  const [carte, setCarte] = useState();
  const [markers, setMarkers] = useState([]);
  const [geocoder, setgeocoder] = useState();

  const [showModal, setshowModal] = useState(false);
  const [currentLocation, setcurrentLocation] = useState({});

  // Initialize Map & Geocoding
  useEffect(() => {
    const onLoad = () => {
      try {
        const options = {
          lat: 48.856614, //latitude
          lng: 2.3522219, // longitude
        };
        const _map = new window.google.maps.Map(ref.current, {
          center: options,
          zoom: 6,
        });
        setCarte(_map);
        const _geocoder = new window.google.maps.Geocoder();
        console.log(_geocoder, 'onGeocode');
        setgeocoder(_geocoder);
      } catch (err) {
        console.log(err);
      }
    };

    if (!window.google === undefined) {
      const script = document.createElement(`script`);
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBwo-QDe0-NuBA5EZSM9UiyAnTYok74maU`;
      document.head.append(script);
      script.addEventListener(`load`, onLoad());
    } else onLoad();
  }, []);
  // Geocoding
  useEffect(() => {
    try {
      // `${placeName}`
      geocoder.geocode({ address: 'paris' }, (results, status) => {
        if (status == 'OK') {
          console.log(
            status,
            results[0].geometry.location.lat(),
            results[0].geometry.location.lng()
          );
        } else {
          alert(
            'Geocode was not successful for the following reason: ' + status
          );
        }
      });
      // setgeocoder(_geocoder);
    } catch (err) {
      console.log(
        '========================================================================================================================================',
        err
      );
    }
  }, [geocoder]);

  // useEffect(() => {
  //   const onGeocode = () => {
  //     try {
  //       const _geocoder = new window.google.maps.Geocoder();
  //       console.log(_geocoder, 'onGeocode');
  //       // setgeocoder(_geocoder);
  //     } catch (err) {
  //       console.log(
  //         '========================================================================================================================================',
  //         err
  //       );
  //     }
  //   };
  //   if (!window.google) {
  //     const script = document.createElement(`script`);
  //     script.src = `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBwo-QDe0-NuBA5EZSM9UiyAnTYok74maU`; //  AIzaSyAhobSlTjGBQSW4nfojOb8T7PFvVN8hG94

  //     document.head.append(script);
  //     script.addEventListener(`load`, onGeocode);
  //   } else onGeocode();
  //   // return () => {
  //   //   cleanup;
  //   // };
  // }, []);

  // get all locations at component mount
  useEffect(() => {
    console.log('getLocations');
    getLocations();
  }, []);

  // call add markers every time locations data change or map rerenders
  useEffect(() => {
    if (locations && carte) {
      addMarkers(locations, carte);
    }
  }, [locations, carte]);

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

    // if (locs.length > 0) {
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
    });
    // } else {
    //   console.log('selectedLatLng');
    // }

    setMarkers(tmpMarkers);
    mapInstance.fitBounds(bounds);
  };

  return (
    <div
      style={{ height: `60vh`, margin: `1em 0`, borderRadius: `0.5em` }}
      ref={ref}
    />
  );
}

// Map.defaultProps = mapOptions;
const mapStateToProps = state => ({
  errors: state.errors,
  locations: state.location.locations,
  loading: state.location.loading,
});

export default connect(mapStateToProps, {
  getLocations,
  getLocationsByUserGeolocation,
})(MapGuest);
