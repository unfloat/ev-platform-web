import React, { useEffect, useRef, useState } from 'react';
import { getCPOLocations } from '../../actions/locationAction';
import { connect } from 'react-redux';

function Map({
  options,
  onMount,
  className,
  onMountProps,
  locations,
  getCPOLocations,
  getLocations,
  filterName,
  filters,
  selectedStation,
}) {
  const ref = useRef();
  const [map, setMap] = useState();
  const [markers, setMarkers] = useState();

  const addBornes = (locations, mapInstance, stations) => {
    // Deleting previous markers before adding the new list of markers
    if (markers) {
      for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      setMarkers([]);
    }
    let tmp = [];
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

      tmp.push(marker);
    });
    setMarkers(tmp);
  };

  useEffect(() => {
    const onLoad = () => {
      const options = {
        lat: 47.179,
        lng: 8.518,
        zoom: 10,
      };

      const map = new window.google.maps.Map(ref.current, {
        center: options,
        zoom: 15,
      });

      if (map) {
        setMap(map);
        //getCPOLocations();
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
  }, [options, getCPOLocations]);

  useEffect(() => {
    if (map) {
      addBornes(locations, map);
    }
    console.log('locations from the server', locations);
  }, [locations, map]);

  // filter location according to our choices
  useEffect(() => {
    console.log(filters);
    if (filters.length != 0) {
      let filteredLocations = locations;
      if (filters.energy != '') {
        filteredLocations = filteredLocations.filter(
          loc => loc.is_green_energy.toString() == filters.energy
        );
      }
      if (filters.format != '') {
        console.log('format loop');
        console.log(filters.format);
        filteredLocations = filteredLocations.map(loc =>
          loc.evses
            ? {
                ...loc,
                evses: loc.evses.filter(
                  item => item.connectors[0].format == filters.format
                ),
              }
            : loc
        );
      }
      if (filters.standard != '') {
        console.log('standard loop');
        console.log(filters.standard);
        filteredLocations = filteredLocations.map(loc =>
          loc.evses
            ? {
                ...loc,
                evses: loc.evses.filter(
                  item => item.connectors[0].standard == filters.standard
                ),
              }
            : loc
        );
      }
      console.log(filteredLocations);
      addMarkers(filteredLocations, map);
    }
  }, [map, filters]);

  // useEffect(() => {
  //   if (filterName != '') {
  //     const filteredLocations = locations.filter(
  //       loc => loc.is_green_energy.toString() == filterName
  //     );
  //     console.log(filteredLocations);
  //     addMarkers(filteredLocations, map);
  //   }
  // }, [map, filterName]);

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

export default connect(mapStateToProps, { getCPOLocations })(Map);
