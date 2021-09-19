import React, { useEffect, useRef, useState } from 'react';
import { getLocations } from '../../actions/locationAction';
import { connect } from 'react-redux';
import { usePosition } from '../../hooks/usePosition';

const Map = ({
  options,
  locations,
  getLocations,
  filters,
  map,
  forwaredRef,
}) => {
  // const  = props;

  // const [map, setMap] = useState();

  const { latitude, longitude } = usePosition();
  const [markers, setMarkers] = useState();
  const [mybounds, setmybounds] = useState({
    lat: latitude,
    lng: longitude,
  });

  //const addMarkers = (locations, mapInstance) => {
  // Deleting previous markers before adding the new list of markers
  //   if (markers) {
  //     for (let i = 0; i < markers.length; i++) {
  //       markers[i].setMap(null);
  //     }
  //     setMarkers([]);
  //   }
  //   let tmp = [];
  //   const bounds = mapInstance.LatLngBounds();

  //   locations.forEach(location => {
  //     const marker = new mapInstance.Marker({
  //       mapInstance,
  //       position: new mapInstance.LatLng(
  //         location.coordinates.latitude,
  //         location.coordinates.longitude
  //       ),
  //       title: location.station_name,
  //     });
  //     marker.setMap(mapInstance);
  //     // const infowindow = new window.google.maps.InfoWindow({
  //     //   content: location.station_name,
  //     //   boxStyle: {
  //     //     width: '300px',
  //     //     height: '300px',
  //     //   },
  //     // });

  //     bounds.extend({
  //       lat: location.coordinates.latitude,
  //       lng: location.coordinates.longitude,
  //     });
  //     mapInstance.fitBounds(bounds);

  //     // marker.addListener(`mouseover`, () => {
  //     //   infowindow.open(mapInstance, marker);
  //     // });
  //     // marker.addListener(`mouseout`, () => {
  //     //   infowindow.close(mapInstance, marker);
  //     // });

  //     tmp.push(marker);
  //   });
  //   setMarkers(tmp);
  // };

  // Drop Markers
  // useEffect(() => {
  //   if (locations.length && map) {
  //     addMarkers(locations, map);
  //   }
  //   console.log('locations from the server', locations);
  // }, [locations, map]);

  // Map Filter
  // useEffect(() => {
  //   if (filters.length != 0) {
  //     let filteredLocations = locations;
  //     // if (filters.greenEnergy != '') {
  //     //   filteredLocations = filteredLocations.filter(
  //     //     loc => loc.is_green_energy?.toString() == filters.greenEnergy
  //     //   );
  //     // }
  //     if (filters.bookable != null) {
  //       filteredLocations = filteredLocations.filter(
  //         loc => loc.bookable.toString() == filters.bookable
  //       );
  //     }
  //     if (filters.payment_by_card != '') {
  //       filteredLocations = filteredLocations.filter(
  //         loc => loc.payment_by_card.toString() == filters.payment_by_card
  //       );
  //     }
  //     addMarkers(filteredLocations, map);

  //     // if (filters.freeCharging != '') {
  //     //   filteredLocations = filteredLocations.filter(
  //     //     loc => loc.freeCharging.toString() == filters.freeCharging
  //     //   );
  //     // }
  //   }
  //   //console.log('filteredLocations', filteredLocations);
  // }, [map, filters]);

  // if (map && typeof onMount === `function`) onMount(map, onMountProps);

  return (
    <div
      style={{ height: `60vh`, margin: `1em 0`, borderRadius: `0.5em` }}
      ref={forwaredRef}
    />
  );
};

// Map.defaultProps = mapOptions;
const mapStateToProps = state => ({
  errors: state.errors,
  locations: state.location.locations,
  loading: state.location.loading,
});

// export default ;
const ConnectedMap = connect(mapStateToProps, { getLocations })(Map);
export default React.forwardRef((props, ref) => (
  <Map {...props} forwaredRef={ref} />
));
