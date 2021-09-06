import React, { useEffect, useRef, useState } from 'react';
import { getLocations } from '../actions/locationAction';
import { connect } from 'react-redux';

function Map({
  options,
  onMount,
  className,
  onMountProps,
  locations,
  getLocations,
  filterName,
  selectedStation,
}) {
  const ref = useRef();
  const [map, setMap] = useState();

  const addMarkers = (locations, mapInstance) => {
    locations.forEach(location => {
      const marker = new window.google.maps.Marker({
        mapInstance,
        position: new window.google.maps.LatLng(
          location.coordinates.latitude,
          location.coordinates.longitude
        ),
        title: location.station_name,
      });
      marker.setMap(mapInstance);
      const infowindow = new window.google.maps.InfoWindow({
        content: location.station_name,
        boxStyle: {
          width: '300px',
          height: '300px',
        },
      });
      marker.addListener(`mouseover`, () => {
        infowindow.open(mapInstance, marker);
      });
      marker.addListener(`mouseout`, () => {
        infowindow.close(mapInstance, marker);
      });
    });
  };

  useEffect(() => {
    const onLoad = () => {
      const map = new window.google.maps.Map(ref.current, options);
      if (map) {
        setMap(map);
        getLocations();

        // addMarkers(getLocations(), map);
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
    if (locations.length && map) {
      addMarkers(locations, map);
    }
    console.log('locations from the server', locations);
  }, [locations, map]);

  useEffect(() => {
    if (filterName != '') {
      const filteredLocations = locations.filter(
        loc => loc.evses.connector == filterName
      );
      console.log(filteredLocations);
      addMarkers(filteredLocations, map);
    }
  }, [map, filterName, locations]);

  // if (map && typeof onMount === `function`) onMount(map, onMountProps);

  return (
    <div
      style={{ height: `60vh`, margin: `1em 0`, borderRadius: `0.5em` }}
      {...{ ref, className }}
    />
  );
}

Map.defaultProps = {
  options: {
    center: { lat: 47.179, lng: 8.518 },
    zoom: 15,
  },
};
const mapStateToProps = state => ({
  errors: state.errors,
  locations: state.location.locations,
  loading: state.location.loading,
});

export default connect(mapStateToProps, { getLocations })(Map);
