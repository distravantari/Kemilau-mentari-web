import promisePolyfill from 'es6-promise';
import 'isomorphic-fetch';

const API_ROOT = process.env.API_ROOT;

promisePolyfill.polyfill();

function getUtilitas() {
  return fetch(`${ API_ROOT }/v1/data/utilitas/`, {
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    return response.json();
  });
}

function addUtilitas(dataUtilitas) {
  return fetch(`${ API_ROOT }/v1/data/utilitas/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...dataUtilitas,
    }),
  }).then((response) => {
    return response.json();
  });
}

function editUtilitas(id, dataUtilitas) {
  return fetch(`${ API_ROOT }/v1/data/utilitas/${ id }/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...dataUtilitas,
    }),
  }).then((response) => {
    return response.json();
  });
}

function deleteUtilitas(id) {
  return fetch(`${ API_ROOT }/v1/data/utilitas/${ id }/`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    return response.json();
  });
}

export default {
  getUtilitas,
  addUtilitas,
  editUtilitas,
  deleteUtilitas,
};
