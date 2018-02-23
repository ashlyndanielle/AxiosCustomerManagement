import axios from 'axios';
import apiURL from './api';

export function getCustomerList() {
  return axios.get(apiURL).then( response => response.data );
}

export function postCustomer (customer) {
  return axios.post(apiURL, customer).then( response => response.data );
}

export function getCustomer (id) {
  return axios.get(apiURL+id).then( response => response.data );
}

export function updateCustomer (id, propertyObject) {
  return axios.patch(apiURL+id, propertyObject).then( response => response.data );
}
