import React, { useEffect, useRef, useState } from 'react';
import { getLocations } from '../../actions/locationAction';
import { connect } from 'react-redux';

function MapGuest({ options, className, locations, getLocations }) {
  const ref = useRef();
  const [map, setMap] = useState(null);
  // const { latitude, longitude } = usePosition();
  const [markers, setMarkers] = useState();
  const [selectedLatLng, setselectedLatLng] = useState({
    latitude: 49.2603667,
    longitude: 3.0872607,
  });
  const [showModal, setshowModal] = useState(false);
  const [currentLocation, setcurrentLocation] = useState({});

  //  removes markers from map
  const removeMarkers = markersArray => {
    markersArray?.forEach(marker => marker.setMap(null));
    setMarkers([]);
  };
  const addMarkers = (locs, mapInstance) => {
    removeMarkers(markers);
    const tmpMarkers = [];
    const bounds = new window.google.maps.LatLngBounds(selectedLatLng);

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
        setshowModal(true);
        setcurrentLocation(location);
      });

      selectedLatLng
        ? bounds.extend(new window.google.maps.LatLng(selectedLatLng))
        : bounds.extend(
            new window.google.maps.LatLng(
              location.AddressInfo.Latitude,
              location.AddressInfo.Longitude
            )
          );
      tmpMarkers.push(marker);
    });

    setMarkers(tmpMarkers);
    mapInstance.fitBounds(bounds);
  };
  useEffect(() => {
    const onLoad = () => {
      const options = {
        lat: 45.891181,
        lng: 4.8223994,
      };

      const map = new window.google.maps.Map(ref.current, {
        center: options,
        zoom: 15,
      });

      if (map) {
        console.log('map', map);
        setMap(map);
        getLocations();
      }
    };

    if (!window.google) {
      const script = document.createElement(`script`);
      // + process.env.GOOGLE_MAPS_API_KEY;
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBwo-QDe0-NuBA5EZSM9UiyAnTYok74maU`;
      document.head.append(script);
      script.addEventListener(`load`, onLoad);

      return () => script.removeEventListener(`load`, onLoad);
    } else onLoad();
  }, [options, getLocations]);

  useEffect(() => {
    getLocations();
  }, []);

  useEffect(() => {
    if (locations.length && map) {
      addMarkers(locations, map);
    }
  }, [locations, map]);

  // if (map && typeof onMount === `function`) onMount(map, onMountProps);

  return (
    <div
      style={{ height: `60vh`, margin: `1em 0`, borderRadius: `0.5em` }}
      {...{ ref, className }}
    />
  );
}

// Map.defaultProps = mapOptions;
const mapStateToProps = state => ({
  errors: state.errors,
  locations: state.location.locations,
  loading: state.location.loading,
});

export default connect(mapStateToProps, { getLocations })(MapGuest);
