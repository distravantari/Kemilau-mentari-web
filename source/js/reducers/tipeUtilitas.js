import { Map, List } from 'immutable';

import {
  GET_TIPE_UTILITAS_START,
  GET_TIPE_UTILITAS_ERROR,
  GET_TIPE_UTILITAS_SUCCESS,

  ADD_TIPE_UTILITAS_START,
  ADD_TIPE_UTILITAS_ERROR,
  ADD_TIPE_UTILITAS_SUCCESS,

  EDIT_TIPE_UTILITAS_START,
  EDIT_TIPE_UTILITAS_ERROR,
  EDIT_TIPE_UTILITAS_SUCCESS,

  DELETE_TIPE_UTILITAS_START,
  DELETE_TIPE_UTILITAS_ERROR,
  DELETE_TIPE_UTILITAS_SUCCESS,
} from 'actions/tipeUtilitas';

const initialState = Map({
  tipeUtilitas: Map({}),
  loading: false,
  error: null,
  shouldUpdate: false,
});

const actionsMap = {
  [GET_TIPE_UTILITAS_START]: (state) => {
    return state.merge({
      loading: true,
      error: null,
    });
  },
  [GET_TIPE_UTILITAS_ERROR]: (state, action) => {
    return state.merge({
      loading: false,
      error: action.error,
    });
  },
  [GET_TIPE_UTILITAS_SUCCESS]: (state, action) => {
    return state.merge({
      loading: false,
      error: null,
      tipeUtilitas: Map({ ...action.data }),
      shouldUpdate: false,
    });
  },
  [ADD_TIPE_UTILITAS_START]: (state) => {
    return state.merge({
      loading: true,
      error: null,
    });
  },
  [ADD_TIPE_UTILITAS_ERROR]: (state, action) => {
    return state.merge({
      loading: false,
      error: action.error,
    });
  },
  [ADD_TIPE_UTILITAS_SUCCESS]: (state, action) => {
    return state.merge({
      loading: false,
      error: null,
      shouldUpdate: true,
    });
  },
  [EDIT_TIPE_UTILITAS_START]: (state) => {
    return state.merge({
      loading: true,
      error: null,
    });
  },
  [EDIT_TIPE_UTILITAS_ERROR]: (state, action) => {
    return state.merge({
      loading: false,
      error: action.error,
    });
  },
  [EDIT_TIPE_UTILITAS_SUCCESS]: (state, action) => {
    return state.merge({
      loading: false,
      error: null,
      shouldUpdate: true,
    });
  },
  [DELETE_TIPE_UTILITAS_START]: (state) => {
    return state.merge({
      loading: true,
      error: null,
    });
  },
  [DELETE_TIPE_UTILITAS_ERROR]: (state, action) => {
    return state.merge({
      loading: false,
      error: action.error,
    });
  },
  [DELETE_TIPE_UTILITAS_SUCCESS]: (state, action) => {
    return state.merge({
      loading: false,
      error: null,
      shouldUpdate: true,
    });
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
