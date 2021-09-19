const connectorTypes = [
  // { value: '', label:'Type de connecteur'},
  { value: 'CHADEMO', label: 'The connector type is CHAdeMO, DC' },
  {
    value: 'DOMESTIC_A',
    label: 'Standard/Domestic household, type "A", NEMA 1-15, 2 pins',
  },
  {
    value: 'DOMESTIC_B',
    label: 'Standard/Domestic household, type "B", NEMA 5-15, 3 pins',
  },
  {
    value: 'DOMESTIC_C',
    label: 'Standard/Domestic household, type "C", CEE 7/17, 2 pins',
  },
  {
    value: 'DOMESTIC_D',
    label: 'Standard/Domestic household, type "D", 3 pin',
  },
  {
    value: 'DOMESTIC_E',
    label: 'Standard/Domestic household, type "E", CEE 7/5 3 pins',
  },
  {
    value: 'DOMESTIC_F',
    label: 'Standard/Domestic household, type "F", CEE 7/4, Schuko, 3 pins',
  },
  {
    value: 'DOMESTIC_G',
    label:
      'Standard/Domestic household, type "G", BS 1363, Commonwealth, 3 pins',
  },
  {
    value: 'DOMESTIC_H',
    label: 'Standard/Domestic household, type "H", SI-32, 3 pins',
  },
  {
    value: 'DOMESTIC_I',
    label: 'Standard/Domestic household, type "I", AS 3112, 3 pins',
  },
  {
    value: 'DOMESTIC_J',
    label: 'Standard/Domestic household, type "J", SEV 1011, 3 pins',
  },
  {
    value: 'DOMESTIC_K',
    label: 'Standard/Domestic household, type "K", DS 60884-2-D1, 3 pins',
  },
  {
    value: 'DOMESTIC_L',
    label: 'Standard/Domestic household, type "L", CEI 23-16-VII, 3 pins',
  },
  {
    value: 'IEC_60309_2_single_16',
    label:
      'IEC 60309-2 Industrial Connector single phase 16 amperes (usually blue)',
  },
  {
    value: 'IEC_60309_2_three_16',
    label:
      'IEC 60309-2 Industrial Connector three phase 16 amperes (usually red)',
  },
  {
    value: 'IEC_60309_2_three_32',
    label:
      'IEC 60309-2 Industrial Connector three phase 32 amperes (usually red)',
  },
  {
    value: 'IEC_60309_2_three_64',
    label:
      'IEC 60309-2 Industrial Connector three phase 64 amperes (usually red)',
  },
  { value: 'IEC_62196_T1', label: 'IEC 62196 Type 1 "SAE J1772"' },
  { value: 'IEC_62196_T1_COMBO', label: 'Combo Type 1 based, DC' },
  { value: 'IEC_62196_T2', label: 'IEC 62196 Type 2 "Mennekes"' },
  { value: 'IEC_62196_T2_COMBO', label: 'Combo Type 2 based, DC' },
  { value: 'IEC_62196_T3A', label: 'IEC 62196 Type 3A' },
  { value: 'IEC_62196_T3C', label: 'IEC 62196 Type 3C "Scame"' },
  {
    value: 'PANTOGRAPH_BOTTOM_UP',
    label: 'On-board Bottom-up-Pantograph typically for bus charging',
  },
  {
    value: 'PANTOGRAPH_TOP_DOWN',
    label: 'Off-board Top-down-Pantograph typically for bus charging',
  },
  { value: 'TESLA_R', label: 'Tesla Connector "Roadster"-type (round, 4 pin)' },
  { value: 'TESLA_S', label: 'Tesla Connector "Model-S"-type (oval, 5 pin)' },
];

export default connectorTypes;
