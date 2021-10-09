import { v4 as uuid } from 'uuid';

const roles = [
  {
    name: 'CPO',
    value: 'CPO',
    label: 'Gérant(e) point de recharge',
    id: uuid(),
  },
  {
    name: 'MSP',
    value: 'MSP',
    label: 'Conducteur véhicule électrique',
    id: uuid(),
  },
];
export default roles;
