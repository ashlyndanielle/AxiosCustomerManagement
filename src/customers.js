import axios from 'axios';
import apiURL from './api';

const udot = 'https://opendata.arcgis.com/datasets/c2c6fe2c52b141b6afb4374d5825c611_0.geojson';

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

export function deleteCustomer (id) {
  return axios.delete(apiURL+id).then( response => response );
}

export function getTraffic() {
  return axios.get(udot).then( response => response.data )
}