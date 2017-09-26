import promisePolyfill from 'es6-promise';
import 'isomorphic-fetch';

const API_ROOT = process.env.API_ROOT;

promisePolyfill.polyfill();

function getSupplier() {
  return fetch(`${ API_ROOT }/v1/data/supplier/`, {
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    return response.json();
  });
}

function addSupplier(dataSupplier) {
  return fetch(`${ API_ROOT }/v1/data/supplier/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...dataSupplier,
    }),
  }).then((response) => {
    return response.json();
  });
}

function editSupplier(id, dataSupplier) {
  return fetch(`${ API_ROOT }/v1/data/supplier/${ id }/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...dataSupplier,
    }),
  }).then((response) => {
    return response.json();
  });
}

function deleteSupplier(id) {
  return fetch(`${ API_ROOT }/v1/data/supplier/${ id }/`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    return response.json();
  });
}

export default {
  getSupplier,
  addSupplier,
  editSupplier,
  deleteSupplier,
};
