import React, { useEffect, useRef, useState } from 'react';
import { getLocations } from '../../actions/locationAction';
import { connect } from 'react-redux';

function MapGuest({ options, className, locations, getLocations, filters }) {
  const ref = useRef();
  const [map, setMap] = useState(null);
  // const { latitude, longitude } = usePosition();
  const [markers, setMarkers] = useState();

  const addMarkers = (locations, mapInstance) => {
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
        lat: 45.891181,
        lng: 4.8223994,
        zoom: 12,
      };
      // if (latitude && longitude) {
      //   options.lat = latitude;
      //   options.lng = longitude;
      //   options.zoom = 7;
      // }
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
    if (locations.length && map) {
      addMarkers(locations, map);
    }
    console.log('locations from the server', locations);
  }, [locations, map]);

  useEffect(() => {
    if (map) {
      //   map.MapMouseEvent(`onclick`, () => {
      //     console.log('click on map');
      //   });

      console.log('aha');
    }
  }, [map]);

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
