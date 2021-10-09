import React, { useEffect, useRef, useState } from 'react';
import { getLocations } from '../../actions/locationAction';
import { connect } from 'react-redux';
import { usePosition } from '../../hooks/usePosition';
import { Alert, Button } from 'react-bootstrap';

const Map = ({ options, locations, getLocations, filters }) => {
  // const  = props;

  const [map, setMap] = useState();
  const ref = useRef(null);
  const { latitude, longitude } = usePosition();
  const [markers, setMarkers] = useState([]);
  const [mybounds, setmybounds] = useState({
    lat: 45.891181, //45.891181
    lng: 4.8223994, // 4.8223994
  });

  const removeMarkers = markersArray => {
    markersArray?.forEach(marker => marker.setMap(null));
    setMarkers([]);
  };
  const addMarkers = (locs, mapInstance) => {
    markers.forEach(marker => marker.setMap(null));
    // Deleting previous markers before adding the new list of markers
    const tmpMarkers = [];
    const bounds = new window.google.maps.LatLngBounds();
    locs.forEach(location => {
      // debugger; // eslint-disable-line no-debugger
      // console.log('=========== ~ file: Map.js ~ line 37 ~ location', location);
      const marker = new window.google.maps.Marker({
        position: new window.google.maps.LatLng(
          parseFloat(location.coordinates.latitude),
          parseFloat(location.coordinates.longitude)
        ),
        // title: location.station_name,
      });
      marker.setMap(mapInstance);

      const infowindow = new window.google.maps.InfoWindow({
        content: `<p>${location.AddressInfo.Title}</p>
        <ul>
          <li><strong>Conditions d'accés</strong>: ${location.AccessComments}</li>
          <li><strong>Type d'emplacement</strong>: ${location.AddressInfo.Title}</li>
          <li><strong>Phone</strong>: <a href="tel:${location.AddressInfo.ContactTelephone1}">${location.ContactTelephone1}</a></li>
        </ul>`,
        boxStyle: {
          width: '300px',
          height: '300px',
        },
      });
      latitude && longitude
        ? bounds.extend(
            new window.google.maps.LatLng(
              parseFloat(latitude),
              parseFloat(longitude)
            )
          )
        : bounds.extend(
            new window.google.maps.LatLng(
              parseFloat(location.coordinates.latitude),
              parseFloat(location.coordinates.longitude)
            )
          );

      marker.addListener('click', () => {
        infowindow.open({
          anchor: marker,
          map: mapInstance,
          shouldFocus: true,
        });
      });

      tmpMarkers.push(marker);
    });

    mapInstance.fitBounds(bounds);
  };
  useEffect(() => {
    const onLoad = () => {
      try {
        const options = {
          lat: 45.891181, //45.891181
          lng: 7, // 4.8223994
        };
        const _map = new window.google.maps.Map(ref.current, {
          center: options,
          zoom: 6,
        });
        setMap(_map);
      } catch (err) {
        console.log(err);
      }
    };

    if (!window.google) {
      const script = document.createElement(`script`);
      // + process.env.GOOGLE_MAPS_API_KEY;
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBwo-QDe0-NuBA5EZSM9UiyAnTYok74maU`;
      document.head.append(script);
      script.addEventListener(`load`, onLoad);

      // return () => script.removeEventListener(`load`, onLoad);
    } else onLoad();
  }, []);

  useEffect(() => {
    getLocations();
  }, []);

  // Drop Markers
  useEffect(() => {
    if (locations.length && map) {
      // .renderingType != 'UNINITIALIZED'
      addMarkers(locations, map, addedMarkers => setMarkers(addedMarkers));
    }
    // console.log('locations from the server', locations);
  }, [locations, map]);

  // Map Filter
  useEffect(() => {
    let filterdLoc = locations;
    if (map && locations) {
      console.log(filters, 'filters useEffect');
      if (filters.isGreenEnergy) {
        filterdLoc = locations.filter(
          loc => loc.is_green_energy === filters.isGreenEnergy
        );
        addMarkers(filterdLoc, map);
      }
      if (filters.isBookable) {
        filterdLoc = locations.filter(
          loc => loc.bookable === filters.isBookable
        );
        addMarkers(filterdLoc, map);
      }
      if (filters.isCbPayment) {
        filterdLoc = locations.filter(
          loc => loc.payment_by_card === filters.isCbPayment
        );
        addMarkers(filterdLoc, map);
      }
      if (filters.isFreeCharging) {
        filterdLoc = locations.filter(
          loc => loc.free_charging === filters.isFreeCharging
        );
        addMarkers(filterdLoc, map);
      }
      if (filters.isAvailable) {
        filterdLoc = locations.filter(
          loc => loc.status === filters.isAvailable
        );
        addMarkers(filterdLoc, map);
      }
      if (filters.supportsTwoWheel) {
        filterdLoc = locations.filter(
          loc => loc.two_wheel === filters.supportsTwoWheel
        );
        addMarkers(filterdLoc, map);
      }
      if (filters.nominal_power) {
        filterdLoc = locations.filter(
          loc => loc.nominal_power === filters.nominal_power
        );
        addMarkers(filterdLoc, map);
      }
      // if (filters.status) {
      //   filterdLoc = locations.filter(loc => loc.status === filters.status);
      //   addMarkers(filterdLoc, map);
      // }

      // if (!filters) {
      //   addMarkers(filterdLoc, map);
      // }
    }
    console.log('filterdLoc', filterdLoc);
  }, [filters]);

  return (
    <>
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
export default connect(mapStateToProps, { getLocations })(Map);
// export default React.forwardRef((props, ref) => (
//   <ConnectedMap {...props} forwaredRef={ref} />
// ));
