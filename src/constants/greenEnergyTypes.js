import { v4 as uuid } from 'uuid';

const greenEnergyTypes = [
  { value: 'true', label: 'Energie Verte', id: uuid() },
  { value: 'false', label: 'Energie non Verte', id: uuid() },
];
export default greenEnergyTypes;
