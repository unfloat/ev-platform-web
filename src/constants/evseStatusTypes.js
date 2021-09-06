const evseStatusTypes = [
  {
    value: 'AVAILABLE',
    label: 'The EVSE/Connector is able to start a new charging session.',
  },
  {
    value: 'BLOCKED',
    label:
      'The EVSE/Connector is not accessible because of a physical barrier, i.e. a car.',
  },
  { value: 'CHARGING', label: 'The EVSE/Connector is in use.' },
  {
    value: 'INOPERATIVE',
    label:
      'The EVSE/Connector is not yet active or it is no longer available (deleted).',
  },
  {
    value: 'OUTOFORDER',
    label: 'The EVSE/Connector is currently out of order.',
  },
  {
    value: 'PLANNED',
    label: 'The EVSE/Connector is planned, will be operating soon.',
  },
  { value: 'REMOVED', label: 'The EVSE/Connector was discontinued/removed.' },
  {
    value: 'RESERVED',
    label:
      'The EVSE/Connector is reserved for a particular EV driver and is unavailable for other drivers.',
  },
  {
    value: 'UNKNOWN',
    label: 'No status information available (also used when offline).',
  },
];
export default evseStatusTypes;
