import { v4 as uuid } from 'uuid';

const payment = [
  { value: 'true', label: 'Paiement par carte bancaire', id: uuid() },
  { value: 'false', label: 'Pas de paiement par carte bancaire', id: uuid() },
];
export default payment;
