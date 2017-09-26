import TipeUtilitasService from 'api/TipeUtilitasService';

export const GET_TIPE_UTILITAS_START = 'GET_TIPE_UTILITAS_START';
export const GET_TIPE_UTILITAS_SUCCESS = 'GET_TIPE_UTILITAS_SUCCESS';
export const GET_TIPE_UTILITAS_ERROR = 'GET_TIPE_UTILITAS_ERROR';

export const ADD_TIPE_UTILITAS_START = 'ADD_TIPE_UTILITAS_START';
export const ADD_TIPE_UTILITAS_SUCCESS = 'ADD_TIPE_UTILITAS_SUCCESS';
export const ADD_TIPE_UTILITAS_ERROR = 'ADD_TIPE_UTILITAS_ERROR';

export const EDIT_TIPE_UTILITAS_START = 'EDIT_TIPE_UTILITAS_START';
export const EDIT_TIPE_UTILITAS_SUCCESS = 'EDIT_TIPE_UTILITAS_SUCCESS';
export const EDIT_TIPE_UTILITAS_ERROR = 'EDIT_TIPE_UTILITAS_ERROR';

export const DELETE_TIPE_UTILITAS_START = 'DELETE_TIPE_UTILITAS_START';
export const DELETE_TIPE_UTILITAS_SUCCESS = 'DELETE_TIPE_UTILITAS_SUCCESS';
export const DELETE_TIPE_UTILITAS_ERROR = 'DELETE_TIPE_UTILITAS_ERROR';


function getTipeUtilitasStart() {
  return {
    type: GET_TIPE_UTILITAS_START,
  };
}

function getTipeUtilitasSuccess(data) {
  return {
    type: GET_TIPE_UTILITAS_SUCCESS,
    data,
  };
}

function getTipeUtilitasError(error) {
  return {
    type: GET_TIPE_UTILITAS_ERROR,
    error,
  };
}

export function getTipeUtilitas() {
  return function (dispatch) {
    dispatch(getTipeUtilitasStart());

    TipeUtilitasService.getTipeUtilitas()
      .then(response => {
        if (response.code === 200) {
          dispatch(getTipeUtilitasSuccess(response));
        } else {
          dispatch(getTipeUtilitasError(response));
        }
      })
      .catch(error => dispatch(getTipeUtilitasError(error)));
  };
}

function addTipeUtilitasStart() {
  return {
    type: ADD_TIPE_UTILITAS_START,
  };
}

function addTipeUtilitasSuccess(data) {
  return {
    type: ADD_TIPE_UTILITAS_SUCCESS,
    data,
  };
}

function addTipeUtilitasError(error) {
  return {
    type: ADD_TIPE_UTILITAS_ERROR,
    error,
  };
}

export function addTipeUtilitas(dataTipeUtilitas) {
  return function (dispatch) {
    dispatch(addTipeUtilitasStart());

    TipeUtilitasService.addTipeUtilitas(dataTipeUtilitas)
      .then(response => {
        if (response.code === 200) {
          dispatch(addTipeUtilitasSuccess(response));
        } else {
          dispatch(addTipeUtilitasError(response));
        }
      })
      .catch(error => dispatch(addTipeUtilitasError(error)));
  };
}

function editTipeUtilitasStart() {
  return {
    type: EDIT_TIPE_UTILITAS_START,
  };
}

function editTipeUtilitasSuccess(data) {
  return {
    type: EDIT_TIPE_UTILITAS_SUCCESS,
    data,
  };
}

function editTipeUtilitasError(error) {
  return {
    type: EDIT_TIPE_UTILITAS_ERROR,
    error,
  };
}

export function editTipeUtilitas(id, dataTipeUtilitas) {
  return function (dispatch) {
    dispatch(editTipeUtilitasStart());

    TipeUtilitasService.editTipeUtilitas(id, dataTipeUtilitas)
      .then(response => {
        if (response.code === 200) {
          dispatch(editTipeUtilitasSuccess(response));
        } else {
          dispatch(editTipeUtilitasError(response));
        }
      })
      .catch(error => dispatch(editTipeUtilitasError(error)));
  };
}

function deleteTipeUtilitasStart() {
  return {
    type: DELETE_TIPE_UTILITAS_START,
  };
}

function deleteTipeUtilitasSuccess(data) {
  return {
    type: DELETE_TIPE_UTILITAS_SUCCESS,
    data,
  };
}

function deleteTipeUtilitasError(error) {
  return {
    type: DELETE_TIPE_UTILITAS_ERROR,
    error,
  };
}

export function deleteTipeUtilitas(id) {
  return function (dispatch) {
    dispatch(deleteTipeUtilitasStart());

    TipeUtilitasService.deleteTipeUtilitas(id)
      .then(response => {
        if (response.code === 200) {
          dispatch(deleteTipeUtilitasSuccess(response));
        } else {
          dispatch(deleteTipeUtilitasError(response));
        }
      })
      .catch(error => dispatch(deleteTipeUtilitasError(error)));
  };
}
