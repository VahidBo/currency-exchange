import { API_KEY } from './constants';
import { Currency } from '../components';
import { instance as axios } from './axiosInstance';
import { useEffect, useState } from 'react';
import { ExchangeRate } from './types';

export const getExchangeRate = (base: Currency, quote: Currency) => {
  return axios.get<ExchangeRate['response']>('convert', {
    params: { q: `${base}_${quote}`, compact: 'ultra', apiKey: API_KEY },
  });
};

export const useExchangeRate = (base: Currency, quote: Currency) => {
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  useEffect(() => {
    getExchangeRate(base, quote).then(resp => {
      setExchangeRate(Object.values(resp.data)[0]);
    });
  }, [base, quote]);
  return exchangeRate;
};
