import axios from 'axios';
import apiURL from './api';

export function getCustomerList() {
  return axios.get(apiURL).then( response => response.data );
}

export function postCustomer (customer) {
  return axios.post(apiURL, customer).then( response => response.data );
}