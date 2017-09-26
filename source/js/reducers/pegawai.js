import { Map, List } from 'immutable';

import {
  GET_PEGAWAI_START,
  GET_PEGAWAI_ERROR,
  GET_PEGAWAI_SUCCESS,

  ADD_PEGAWAI_START,
  ADD_PEGAWAI_ERROR,
  ADD_PEGAWAI_SUCCESS,

  EDIT_PEGAWAI_START,
  EDIT_PEGAWAI_ERROR,
  EDIT_PEGAWAI_SUCCESS,

  DELETE_PEGAWAI_START,
  DELETE_PEGAWAI_ERROR,
  DELETE_PEGAWAI_SUCCESS,
} from 'actions/pegawai';

const initialState = Map({
  pegawai: Map({}),
  loading: false,
  error: null,
  shouldUpdate: false,
});

const actionsMap = {
  [GET_PEGAWAI_START]: (state) => {
    return state.merge({
      loading: true,
      error: null,
    });
  },
  [GET_PEGAWAI_ERROR]: (state, action) => {
    return state.merge({
      loading: false,
      error: action.error,
    });
  },
  [GET_PEGAWAI_SUCCESS]: (state, action) => {
    return state.merge({
      loading: false,
      error: null,
      pegawai: Map({ ...action.data }),
      shouldUpdate: false,
    });
  },
  [ADD_PEGAWAI_START]: (state) => {
    return state.merge({
      loading: true,
      error: null,
    });
  },
  [ADD_PEGAWAI_ERROR]: (state, action) => {
    return state.merge({
      loading: false,
      error: action.error,
    });
  },
  [ADD_PEGAWAI_SUCCESS]: (state, action) => {
    return state.merge({
      loading: false,
      error: null,
      shouldUpdate: true,
    });
  },
  [EDIT_PEGAWAI_START]: (state) => {
    return state.merge({
      loading: true,
      error: null,
    });
  },
  [EDIT_PEGAWAI_ERROR]: (state, action) => {
    return state.merge({
      loading: false,
      error: action.error,
    });
  },
  [EDIT_PEGAWAI_SUCCESS]: (state, action) => {
    return state.merge({
      loading: false,
      error: null,
      shouldUpdate: true,
    });
  },
  [DELETE_PEGAWAI_START]: (state) => {
    return state.merge({
      loading: true,
      error: null,
    });
  },
  [DELETE_PEGAWAI_ERROR]: (state, action) => {
    return state.merge({
      loading: false,
      error: action.error,
    });
  },
  [DELETE_PEGAWAI_SUCCESS]: (state, action) => {
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
