import promisePolyfill from 'es6-promise';
import 'isomorphic-fetch';

const API_ROOT = process.env.API_ROOT;

promisePolyfill.polyfill();

function getBarang() {
  return fetch(`${ API_ROOT }/v1/data/barang/`, {
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    return response.json();
  });
}

function addBarang(dataBarang) {
  return fetch(`${ API_ROOT }/v1/data/barang/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...dataBarang,
    }),
  }).then((response) => {
    return response.json();
  });
}

function editBarang(id, dataBarang) {
  return fetch(`${ API_ROOT }/v1/data/barang/${ id }/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...dataBarang,
    }),
  }).then((response) => {
    return response.json();
  });
}

function deleteBarang(id) {
  return fetch(`${ API_ROOT }/v1/data/barang/${ id }/`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    return response.json();
  });
}

export default {
  getBarang,
  addBarang,
  editBarang,
  deleteBarang,
};
