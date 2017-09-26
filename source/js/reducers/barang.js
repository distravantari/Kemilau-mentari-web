import { Map, List } from 'immutable';

import {
  GET_BARANG_START,
  GET_BARANG_ERROR,
  GET_BARANG_SUCCESS,

  ADD_BARANG_START,
  ADD_BARANG_ERROR,
  ADD_BARANG_SUCCESS,

  EDIT_BARANG_START,
  EDIT_BARANG_ERROR,
  EDIT_BARANG_SUCCESS,

  DELETE_BARANG_START,
  DELETE_BARANG_ERROR,
  DELETE_BARANG_SUCCESS,
} from 'actions/barang';

const initialState = Map({
  barang: Map({}),
  loading: false,
  error: null,
  shouldUpdate: false,
});

const actionsMap = {
  [GET_BARANG_START]: (state) => {
    return state.merge({
      loading: true,
      error: null,
    });
  },
  [GET_BARANG_ERROR]: (state, action) => {
    return state.merge({
      loading: false,
      error: action.error,
    });
  },
  [GET_BARANG_SUCCESS]: (state, action) => {
    return state.merge({
      loading: false,
      error: null,
      barang: Map({ ...action.data }),
      shouldUpdate: false,
    });
  },
  [ADD_BARANG_START]: (state) => {
    return state.merge({
      loading: true,
      error: null,
    });
  },
  [ADD_BARANG_ERROR]: (state, action) => {
    return state.merge({
      loading: false,
      error: action.error,
    });
  },
  [ADD_BARANG_SUCCESS]: (state, action) => {
    return state.merge({
      loading: false,
      error: null,
      shouldUpdate: true,
    });
  },
  [EDIT_BARANG_START]: (state) => {
    return state.merge({
      loading: true,
      error: null,
    });
  },
  [EDIT_BARANG_ERROR]: (state, action) => {
    return state.merge({
      loading: false,
      error: action.error,
    });
  },
  [EDIT_BARANG_SUCCESS]: (state, action) => {
    return state.merge({
      loading: false,
      error: null,
      shouldUpdate: true,
    });
  },
  [DELETE_BARANG_START]: (state) => {
    return state.merge({
      loading: true,
      error: null,
    });
  },
  [DELETE_BARANG_ERROR]: (state, action) => {
    return state.merge({
      loading: false,
      error: action.error,
    });
  },
  [DELETE_BARANG_SUCCESS]: (state, action) => {
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
