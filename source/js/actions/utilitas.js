import UtilitasService from 'api/UtilitasService';

export const GET_UTILITAS_START = 'GET_UTILITAS_START';
export const GET_UTILITAS_SUCCESS = 'GET_UTILITAS_SUCCSS';
export const GET_UTILITAS_ERROR = 'GET_UTILITAS_ERROR';

export const ADD_UTILITAS_START = 'ADD_UTILITAS_START';
export const ADD_UTILITAS_SUCCESS = 'ADD_UTILITAS_SUCCSS';
export const ADD_UTILITAS_ERROR = 'ADD_UTILITAS_ERROR';

export const EDIT_UTILITAS_START = 'EDIT_UTILITAS_START';
export const EDIT_UTILITAS_SUCCESS = 'EDIT_UTILITAS_SUCCSS';
export const EDIT_UTILITAS_ERROR = 'EDIT_UTILITAS_ERROR';

export const DELETE_UTILITAS_START = 'DELETE_UTILITAS_START';
export const DELETE_UTILITAS_SUCCESS = 'DELETE_UTILITAS_SUCCSS';
export const DELETE_UTILITAS_ERROR = 'DELETE_UTILITAS_ERROR';


function getUtilitasStart() {
  return {
    type: GET_UTILITAS_START,
  };
}

function getUtilitasSuccess(data) {
  return {
    type: GET_UTILITAS_START,
    data,
  };
}

function getUtilitasError(error) {
  return {
    type: GET_UTILITAS_START,
    error,
  };
}

export function getUtilitas() {
  return function (dispatch) {
    dispatch(getUtilitasStart());

    UtilitasService.getUtilitas()
      .then(response => {
        if (response.results) {
          dispatch(getUtilitasSuccess(response));
        } else {
          dispatch(getUtilitasError(response));
        }
      })
      .catch(error => dispatch(getUtilitasError(error)));
  };
}

function addUtilitasStart() {
  return {
    type: ADD_UTILITAS_START,
  };
}

function addUtilitasSuccess(data) {
  return {
    type: ADD_UTILITAS_START,
    data,
  };
}

function addUtilitasError(error) {
  return {
    type: ADD_UTILITAS_START,
    error,
  };
}

export function addUtilitas(dataUtilitas) {
  return function (dispatch) {
    dispatch(addUtilitasStart());

    UtilitasService.addUtilitas(dataUtilitas)
      .then(response => {
        if (response.results) {
          dispatch(addUtilitasSuccess(response));
        } else {
          dispatch(addUtilitasError(response));
        }
      })
      .catch(error => dispatch(addUtilitasError(error)));
  };
}

function editUtilitasStart() {
  return {
    type: EDIT_UTILITAS_START,
  };
}

function editUtilitasSuccess(data) {
  return {
    type: EDIT_UTILITAS_START,
    data,
  };
}

function editUtilitasError(error) {
  return {
    type: EDIT_UTILITAS_START,
    error,
  };
}

export function editUtilitas(id, dataUtilitas) {
  return function (dispatch) {
    dispatch(editUtilitasStart());

    UtilitasService.editUtilitas(id, dataUtilitas)
      .then(response => {
        if (response.results) {
          dispatch(editUtilitasSuccess(response));
        } else {
          dispatch(editUtilitasError(response));
        }
      })
      .catch(error => dispatch(editUtilitasError(error)));
  };
}

function deleteUtilitasStart() {
  return {
    type: DELETE_UTILITAS_START,
  };
}

function deleteUtilitasSuccess(data) {
  return {
    type: DELETE_UTILITAS_START,
    data,
  };
}

function deleteUtilitasError(error) {
  return {
    type: DELETE_UTILITAS_START,
    error,
  };
}

export function deleteUtilitas(id) {
  return function (dispatch) {
    dispatch(deleteUtilitasStart());

    UtilitasService.deleteUtilitas(id)
      .then(response => {
        if (response.results) {
          dispatch(deleteUtilitasSuccess(response));
        } else {
          dispatch(deleteUtilitasError(response));
        }
      })
      .catch(error => dispatch(deleteUtilitasError(error)));
  };
}
