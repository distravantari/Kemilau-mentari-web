import promisePolyfill from 'es6-promise';
import 'isomorphic-fetch';

const API_ROOT = process.env.API_ROOT;

promisePolyfill.polyfill();

function getKonsumen() {
  return fetch(`${ API_ROOT }/v1/data/konsumen/`, {
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    return response.json();
  });
}

function addKonsumen(dataKonsumen) {
  return fetch(`${ API_ROOT }/v1/data/konsumen/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...dataKonsumen,
    }),
  }).then((response) => {
    return response.json();
  });
}

function editKonsumen(id, dataKonsumen) {
  return fetch(`${ API_ROOT }/v1/data/konsumen/${ id }/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...dataKonsumen,
    }),
  }).then((response) => {
    return response.json();
  });
}

function deleteKonsumen(id) {
  return fetch(`${ API_ROOT }/v1/data/konsumen/${ id }/`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    return response.json();
  });
}

export default {
  getKonsumen,
  addKonsumen,
  editKonsumen,
  deleteKonsumen,
};
