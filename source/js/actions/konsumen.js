import KonsumenService from 'api/KonsumenService';

export const GET_KONSUMEN_START = 'GET_KONSUMEN_START';
export const GET_KONSUMEN_SUCCESS = 'GET_KONSUMEN_SUCCESS';
export const GET_KONSUMEN_ERROR = 'GET_KONSUMEN_ERROR';

export const ADD_KONSUMEN_START = 'ADD_KONSUMEN_START';
export const ADD_KONSUMEN_SUCCESS = 'ADD_KONSUMEN_SUCCESS';
export const ADD_KONSUMEN_ERROR = 'ADD_KONSUMEN_ERROR';

export const EDIT_KONSUMEN_START = 'EDIT_KONSUMEN_START';
export const EDIT_KONSUMEN_SUCCESS = 'EDIT_KONSUMEN_SUCCESS';
export const EDIT_KONSUMEN_ERROR = 'EDIT_KONSUMEN_ERROR';

export const DELETE_KONSUMEN_START = 'DELETE_KONSUMEN_START';
export const DELETE_KONSUMEN_SUCCESS = 'DELETE_KONSUMEN_SUCCESS';
export const DELETE_KONSUMEN_ERROR = 'DELETE_KONSUMEN_ERROR';


function getKonsumenStart() {
  return {
    type: GET_KONSUMEN_START,
  };
}

function getKonsumenSuccess(data) {
  return {
    type: GET_KONSUMEN_SUCCESS,
    data,
  };
}

function getKonsumenError(error) {
  return {
    type: GET_KONSUMEN_ERROR,
    error,
  };
}

export function getKonsumen() {
  return function (dispatch) {
    dispatch(getKonsumenStart());

    KonsumenService.getKonsumen()
      .then(response => {
        if (response.code === 200) {
          dispatch(getKonsumenSuccess(response));
        } else {
          dispatch(getKonsumenError(response));
        }
      })
      .catch(error => dispatch(getKonsumenError(error)));
  };
}

function addKonsumenStart() {
  return {
    type: ADD_KONSUMEN_START,
  };
}

function addKonsumenSuccess(data) {
  return {
    type: ADD_KONSUMEN_SUCCESS,
    data,
  };
}

function addKonsumenError(error) {
  return {
    type: ADD_KONSUMEN_ERROR,
    error,
  };
}

export function addKonsumen(dataKonsumen) {
  return function (dispatch) {
    dispatch(addKonsumenStart());

    KonsumenService.addKonsumen(dataKonsumen)
      .then(response => {
        if (response.code === 200) {
          dispatch(addKonsumenSuccess(response));
        } else {
          dispatch(addKonsumenError(response));
        }
      })
      .catch(error => dispatch(addKonsumenError(error)));
  };
}

function editKonsumenStart() {
  return {
    type: EDIT_KONSUMEN_START,
  };
}

function editKonsumenSuccess(data) {
  return {
    type: EDIT_KONSUMEN_SUCCESS,
    data,
  };
}

function editKonsumenError(error) {
  return {
    type: EDIT_KONSUMEN_ERROR,
    error,
  };
}

export function editKonsumen(id, dataKonsumen) {
  return function (dispatch) {
    dispatch(editKonsumenStart());

    KonsumenService.editKonsumen(id, dataKonsumen)
      .then(response => {
        if (response.code === 200) {
          dispatch(editKonsumenSuccess(response));
        } else {
          dispatch(editKonsumenError(response));
        }
      })
      .catch(error => dispatch(editKonsumenError(error)));
  };
}

function deleteKonsumenStart() {
  return {
    type: DELETE_KONSUMEN_START,
  };
}

function deleteKonsumenSuccess(data) {
  return {
    type: DELETE_KONSUMEN_SUCCESS,
    data,
  };
}

function deleteKonsumenError(error) {
  return {
    type: DELETE_KONSUMEN_ERROR,
    error,
  };
}

export function deleteKonsumen(id) {
  return function (dispatch) {
    dispatch(deleteKonsumenStart());

    KonsumenService.deleteKonsumen(id)
      .then(response => {
        if (response.code === 200) {
          dispatch(deleteKonsumenSuccess(response));
        } else {
          dispatch(deleteKonsumenError(response));
        }
      })
      .catch(error => dispatch(deleteKonsumenError(error)));
  };
}
