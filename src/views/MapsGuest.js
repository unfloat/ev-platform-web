import React, { useRef, useState } from 'react';
// UI components
import MapGuest from '../components/guest/MapGuest';
import {
  ToggleButton,
  Card,
  Form,
  ButtonGroup,
  Container,
  Row,
  Col,
  Button,
} from 'react-bootstrap';

// constants
import greenEnergyTypeOptions from './../constants/greenEnergyTypes';
import bookableOptions from './../constants/bookable';
import paymentOptions from './../constants/payment';

function MapsGuest() {
  const [filters, setFilters] = useState({});

  // filters={filters}

  return (
    <>
      <MapGuest />
    </>
  );
}

export default MapsGuest;
