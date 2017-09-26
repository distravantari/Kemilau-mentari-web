import BarangService from 'api/BarangService';

export const GET_BARANG_START = 'GET_BARANG_START';
export const GET_BARANG_SUCCESS = 'GET_BARANG_SUCCESS';
export const GET_BARANG_ERROR = 'GET_BARANG_ERROR';

export const ADD_BARANG_START = 'ADD_BARANG_START';
export const ADD_BARANG_SUCCESS = 'ADD_BARANG_SUCCESS';
export const ADD_BARANG_ERROR = 'ADD_BARANG_ERROR';

export const EDIT_BARANG_START = 'EDIT_BARANG_START';
export const EDIT_BARANG_SUCCESS = 'EDIT_BARANG_SUCCESS';
export const EDIT_BARANG_ERROR = 'EDIT_BARANG_ERROR';

export const DELETE_BARANG_START = 'DELETE_BARANG_START';
export const DELETE_BARANG_SUCCESS = 'DELETE_BARANG_SUCCESS';
export const DELETE_BARANG_ERROR = 'DELETE_BARANG_ERROR';


function getBarangStart() {
  return {
    type: GET_BARANG_START,
  };
}

function getBarangSuccess(data) {
  return {
    type: GET_BARANG_SUCCESS,
    data,
  };
}

function getBarangError(error) {
  return {
    type: GET_BARANG_ERROR,
  };
}

export function getBarang() {
  return function (dispatch) {
    dispatch(getBarangStart());

    BarangService.getBarang()
      .then(response => {
        if (response.code === 200) {
          dispatch(getBarangSuccess(response));
        } else {
          dispatch(getBarangError(response));
        }
      })
      .catch(error => dispatch(getBarangError(error)));
  };
}

function addBarangStart() {
  return {
    type: ADD_BARANG_START,
  };
}

function addBarangSuccess(data) {
  return {
    type: ADD_BARANG_SUCCESS,
    data,
  };
}

function addBarangError(error) {
  return {
    type: ADD_BARANG_ERROR,
    error,
  };
}

export function addBarang(dataBarang) {
  return function (dispatch) {
    dispatch(addBarangStart());

    BarangService.addBarang(dataBarang)
      .then(response => {
        if (response.code === 200) {
          dispatch(addBarangSuccess(response));
        } else {
          dispatch(addBarangError(response));
        }
      })
      .catch(error => dispatch(addBarangError(error)));
  };
}

function editBarangStart() {
  return {
    type: EDIT_BARANG_START,
  };
}

function editBarangSuccess(data) {
  return {
    type: EDIT_BARANG_SUCCESS,
    data,
  };
}

function editBarangError(error) {
  return {
    type: EDIT_BARANG_ERROR,
    error,
  };
}

export function editBarang(id, dataBarang) {
  return function (dispatch) {
    dispatch(editBarangStart());

    BarangService.editBarang(id, dataBarang)
      .then(response => {
        if (response.code === 200) {
          dispatch(editBarangSuccess(response));
        } else {
          dispatch(editBarangError(response));
        }
      })
      .catch(error => dispatch(editBarangError(error)));
  };
}

function deleteBarangStart() {
  return {
    type: DELETE_BARANG_START,
  };
}

function deleteBarangSuccess(data) {
  return {
    type: DELETE_BARANG_SUCCESS,
    data,
  };
}

function deleteBarangError(error) {
  return {
    type: DELETE_BARANG_ERROR,
    error,
  };
}

export function deleteBarang(id) {
  return function (dispatch) {
    dispatch(deleteBarangStart());

    BarangService.deleteBarang(id)
      .then(response => {
        if (response.code === 200) {
          dispatch(deleteBarangSuccess(response));
        } else {
          dispatch(deleteBarangError(response));
        }
      })
      .catch(error => dispatch(deleteBarangError(error)));
  };
}
