import PegawaiService from 'api/PegawaiService';

export const GET_PEGAWAI_START = 'GET_PEGAWAI_START';
export const GET_PEGAWAI_SUCCESS = 'GET_PEGAWAI_SUCCSS';
export const GET_PEGAWAI_ERROR = 'GET_PEGAWAI_ERROR';

export const ADD_PEGAWAI_START = 'ADD_PEGAWAI_START';
export const ADD_PEGAWAI_SUCCESS = 'ADD_PEGAWAI_SUCCSS';
export const ADD_PEGAWAI_ERROR = 'ADD_PEGAWAI_ERROR';

export const EDIT_PEGAWAI_START = 'EDIT_PEGAWAI_START';
export const EDIT_PEGAWAI_SUCCESS = 'EDIT_PEGAWAI_SUCCSS';
export const EDIT_PEGAWAI_ERROR = 'EDIT_PEGAWAI_ERROR';

export const DELETE_PEGAWAI_START = 'DELETE_PEGAWAI_START';
export const DELETE_PEGAWAI_SUCCESS = 'DELETE_PEGAWAI_SUCCSS';
export const DELETE_PEGAWAI_ERROR = 'DELETE_PEGAWAI_ERROR';


function getPegawaiStart() {
  return {
    type: GET_PEGAWAI_START,
  };
}

function getPegawaiSuccess(data) {
  return {
    type: GET_PEGAWAI_START,
    data,
  };
}

function getPegawaiError(error) {
  return {
    type: GET_PEGAWAI_START,
    error,
  };
}

export function getPegawai() {
  return function (dispatch) {
    dispatch(getPegawaiStart());

    PegawaiService.getPegawai()
      .then(response => {
        if (response.results) {
          dispatch(getPegawaiSuccess(response));
        } else {
          dispatch(getPegawaiError(response));
        }
      })
      .catch(error => dispatch(getPegawaiError(error)));
  };
}

function addPegawaiStart() {
  return {
    type: ADD_PEGAWAI_START,
  };
}

function addPegawaiSuccess(data) {
  return {
    type: ADD_PEGAWAI_START,
    data,
  };
}

function addPegawaiError(error) {
  return {
    type: ADD_PEGAWAI_START,
    error,
  };
}

export function addPegawai(dataPegawai) {
  return function (dispatch) {
    dispatch(addPegawaiStart());

    PegawaiService.addPegawai(dataPegawai)
      .then(response => {
        if (response.results) {
          dispatch(addPegawaiSuccess(response));
        } else {
          dispatch(addPegawaiError(response));
        }
      })
      .catch(error => dispatch(addPegawaiError(error)));
  };
}

function editPegawaiStart() {
  return {
    type: EDIT_PEGAWAI_START,
  };
}

function editPegawaiSuccess(data) {
  return {
    type: EDIT_PEGAWAI_START,
    data,
  };
}

function editPegawaiError(error) {
  return {
    type: EDIT_PEGAWAI_START,
    error,
  };
}

export function editPegawai(id, dataPegawai) {
  return function (dispatch) {
    dispatch(editPegawaiStart());

    PegawaiService.editPegawai(id, dataPegawai)
      .then(response => {
        if (response.results) {
          dispatch(editPegawaiSuccess(response));
        } else {
          dispatch(editPegawaiError(response));
        }
      })
      .catch(error => dispatch(editPegawaiError(error)));
  };
}

function deletePegawaiStart() {
  return {
    type: DELETE_PEGAWAI_START,
  };
}

function deletePegawaiSuccess(data) {
  return {
    type: DELETE_PEGAWAI_START,
    data,
  };
}

function deletePegawaiError(error) {
  return {
    type: DELETE_PEGAWAI_START,
    error,
  };
}

export function deletePegawai(id) {
  return function (dispatch) {
    dispatch(deletePegawaiStart());

    PegawaiService.deletePegawai(id)
      .then(response => {
        if (response.results) {
          dispatch(deletePegawaiSuccess(response));
        } else {
          dispatch(deletePegawaiError(response));
        }
      })
      .catch(error => dispatch(deletePegawaiError(error)));
  };
}
