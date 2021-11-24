import { API_KEY } from './constants';
import { Currency } from '../components';

export const getExchangeRate = (base: Currency, quote: Currency) => {
  return fetch(`https://free.currconv.com/api/v7/convert?q=${base}_${quote}&compact=ultra&apiKey=${API_KEY}`)
    .then(response => response.json())
    .catch(() => {
      // Error handling
    });
};
