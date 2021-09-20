import React, { useRef, useState } from 'react';
// UI components
import Map from '../../components/cpo/Map';

function Bornes() {
  // filters={filters}
  const [stations, setstations] = useState({});

  return (
    <>
      <Map stations={stations} />
    </>
  );
}

export default Bornes;
