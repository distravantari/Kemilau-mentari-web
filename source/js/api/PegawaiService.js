import promisePolyfill from 'es6-promise';
import 'isomorphic-fetch';

const API_ROOT = process.env.API_ROOT;

promisePolyfill.polyfill();

function getPegawai() {
  return fetch(`${ API_ROOT }/v1/data/pegawai/`, {
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    return response.json();
  });
}

function addPegawai(dataPegawai) {
  return fetch(`${ API_ROOT }/v1/data/pegawai/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...dataPegawai,
    }),
  }).then((response) => {
    return response.json();
  });
}

function editPegawai(id, dataPegawai) {
  return fetch(`${ API_ROOT }/v1/data/pegawai/${ id }/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...dataPegawai,
    }),
  }).then((response) => {
    return response.json();
  });
}

function deletePegawai(id) {
  return fetch(`${ API_ROOT }/v1/data/pegawai/${ id }/`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    return response.json();
  });
}

export default {
  getPegawai,
  addPegawai,
  editPegawai,
  deletePegawai,
};
