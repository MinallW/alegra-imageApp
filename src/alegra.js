import axios from 'axios';
import config from '../config';

export default function createInvoice(params) {
  return axios({
    method: 'post',
    url: 'https://api.alegra.com/api/v1/invoices',
    headers: { Authorization: config.alegraAuth },
    data: {
      ...params,
    },
  });
}

export function fetchInvoice(id) {
  return axios({
    method: 'get',
    url: `https://api.alegra.com/api/v1/invoices/${id}`,
    headers: { Authorization: config.alegraAuth },
  });
}

export function checkSellers() {
  return axios({
    method: 'get',
    url: 'https://api.alegra.com/api/v1/sellers/',
    headers: { Authorization: config.alegraAuth },
  });
}
