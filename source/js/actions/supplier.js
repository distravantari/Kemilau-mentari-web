import SupplierService from 'api/SupplierService';

export const GET_SUPPLIER_START = 'GET_SUPPLIER_START';
export const GET_SUPPLIER_SUCCESS = 'GET_SUPPLIER_SUCCESS';
export const GET_SUPPLIER_ERROR = 'GET_SUPPLIER_ERROR';

export const ADD_SUPPLIER_START = 'ADD_SUPPLIER_START';
export const ADD_SUPPLIER_SUCCESS = 'ADD_SUPPLIER_SUCCESS';
export const ADD_SUPPLIER_ERROR = 'ADD_SUPPLIER_ERROR';

export const EDIT_SUPPLIER_START = 'EDIT_SUPPLIER_START';
export const EDIT_SUPPLIER_SUCCESS = 'EDIT_SUPPLIER_SUCCESS';
export const EDIT_SUPPLIER_ERROR = 'EDIT_SUPPLIER_ERROR';

export const DELETE_SUPPLIER_START = 'DELETE_SUPPLIER_START';
export const DELETE_SUPPLIER_SUCCESS = 'DELETE_SUPPLIER_SUCCESS';
export const DELETE_SUPPLIER_ERROR = 'DELETE_SUPPLIER_ERROR';


function getSupplierStart() {
  return {
    type: GET_SUPPLIER_START,
  };
}

function getSupplierSuccess(data) {
  return {
    type: GET_SUPPLIER_SUCCESS,
    data,
  };
}

function getSupplierError(error) {
  return {
    type: GET_SUPPLIER_ERROR,
    error,
  };
}

export function getSupplier() {
  return function (dispatch) {
    dispatch(getSupplierStart());

    SupplierService.getSupplier()
      .then(response => {
        if (response.code === 200) {
          dispatch(getSupplierSuccess(response));
        } else {
          dispatch(getSupplierError(response));
        }
      })
      .catch(error => dispatch(getSupplierError(error)));
  };
}

function addSupplierStart() {
  return {
    type: ADD_SUPPLIER_START,
  };
}

function addSupplierSuccess(data) {
  return {
    type: ADD_SUPPLIER_SUCCESS,
    data,
  };
}

function addSupplierError(error) {
  return {
    type: ADD_SUPPLIER_ERROR,
    error,
  };
}

export function addSupplier(dataSupplier) {
  return function (dispatch) {
    dispatch(addSupplierStart());

    SupplierService.addSupplier(dataSupplier)
      .then(response => {
        if (response.code === 200) {
          dispatch(addSupplierSuccess(response));
        } else {
          dispatch(addSupplierError(response));
        }
      })
      .catch(error => dispatch(addSupplierError(error)));
  };
}

function editSupplierStart() {
  return {
    type: EDIT_SUPPLIER_START,
  };
}

function editSupplierSuccess(data) {
  return {
    type: EDIT_SUPPLIER_SUCCESS,
    data,
  };
}

function editSupplierError(error) {
  return {
    type: EDIT_SUPPLIER_ERROR,
    error,
  };
}

export function editSupplier(id, dataSupplier) {
  return function (dispatch) {
    dispatch(editSupplierStart());

    SupplierService.editSupplier(id, dataSupplier)
      .then(response => {
        if (response.code === 200) {
          dispatch(editSupplierSuccess(response));
        } else {
          dispatch(editSupplierError(response));
        }
      })
      .catch(error => dispatch(editSupplierError(error)));
  };
}

function deleteSupplierStart() {
  return {
    type: DELETE_SUPPLIER_START,
  };
}

function deleteSupplierSuccess(data) {
  return {
    type: DELETE_SUPPLIER_SUCCESS,
    data,
  };
}

function deleteSupplierError(error) {
  return {
    type: DELETE_SUPPLIER_ERROR,
    error,
  };
}

export function deleteSupplier(id) {
  return function (dispatch) {
    dispatch(deleteSupplierStart());

    SupplierService.deleteSupplier(id)
      .then(response => {
        if (response.code === 200) {
          dispatch(deleteSupplierSuccess(response));
        } else {
          dispatch(deleteSupplierError(response));
        }
      })
      .catch(error => dispatch(deleteSupplierError(error)));
  };
}
