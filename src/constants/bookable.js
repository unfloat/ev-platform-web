import { v4 as uuid } from 'uuid';

const bookable = [
  { value: 'true', label: 'Réservable', id: uuid() },
  { value: 'false', label: 'Non réservable', id: uuid() },
];
export default bookable;
