import promisePolyfill from 'es6-promise';
import 'isomorphic-fetch';

const API_ROOT = process.env.API_ROOT;

promisePolyfill.polyfill();

function getTipeUtilitas() {
  return fetch(`${ API_ROOT }/v1/data/tipe_utilitas/`, {
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    return response.json();
  });
}

function addTipeUtilitas(dataTipeUtilitas) {
  return fetch(`${ API_ROOT }/v1/data/tipe_utilitas/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...dataTipeUtilitas,
    }),
  }).then((response) => {
    return response.json();
  });
}

function editTipeUtilitas(id, dataTipeUtilitas) {
  return fetch(`${ API_ROOT }/v1/data/tipe_utilitas/${ id }/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...dataTipeUtilitas,
    }),
  }).then((response) => {
    return response.json();
  });
}

function deleteTipeUtilitas(id) {
  return fetch(`${ API_ROOT }/v1/data/tipe_utilitas/${ id }/`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    return response.json();
  });
}

export default {
  getTipeUtilitas,
  addTipeUtilitas,
  editTipeUtilitas,
  deleteTipeUtilitas,
};
