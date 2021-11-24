import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://free.currconv.com/api/v7/',
});
