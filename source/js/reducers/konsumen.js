import { Map, List } from 'immutable';

import {
  GET_KONSUMEN_START,
  GET_KONSUMEN_ERROR,
  GET_KONSUMEN_SUCCESS,

  ADD_KONSUMEN_START,
  ADD_KONSUMEN_ERROR,
  ADD_KONSUMEN_SUCCESS,

  EDIT_KONSUMEN_START,
  EDIT_KONSUMEN_ERROR,
  EDIT_KONSUMEN_SUCCESS,

  DELETE_KONSUMEN_START,
  DELETE_KONSUMEN_ERROR,
  DELETE_KONSUMEN_SUCCESS,
} from 'actions/konsumen';

const initialState = Map({
  konsumen: Map({}),
  loading: false,
  error: null,
  shouldUpdate: false,
});

const actionsMap = {
  [GET_KONSUMEN_START]: (state) => {
    return state.merge({
      loading: true,
      error: null,
    });
  },
  [GET_KONSUMEN_ERROR]: (state, action) => {
    return state.merge({
      loading: false,
      error: action.error,
    });
  },
  [GET_KONSUMEN_SUCCESS]: (state, action) => {
    return state.merge({
      loading: false,
      error: null,
      konsumen: Map({ ...action.data }),
      shouldUpdate: false,
    });
  },
  [ADD_KONSUMEN_START]: (state) => {
    return state.merge({
      loading: true,
      error: null,
    });
  },
  [ADD_KONSUMEN_ERROR]: (state, action) => {
    return state.merge({
      loading: false,
      error: action.error,
    });
  },
  [ADD_KONSUMEN_SUCCESS]: (state, action) => {
    return state.merge({
      loading: false,
      error: null,
      shouldUpdate: true,
    });
  },
  [EDIT_KONSUMEN_START]: (state) => {
    return state.merge({
      loading: true,
      error: null,
    });
  },
  [EDIT_KONSUMEN_ERROR]: (state, action) => {
    return state.merge({
      loading: false,
      error: action.error,
    });
  },
  [EDIT_KONSUMEN_SUCCESS]: (state, action) => {
    return state.merge({
      loading: false,
      error: null,
      shouldUpdate: true,
    });
  },
  [DELETE_KONSUMEN_START]: (state) => {
    return state.merge({
      loading: true,
      error: null,
    });
  },
  [DELETE_KONSUMEN_ERROR]: (state, action) => {
    return state.merge({
      loading: false,
      error: action.error,
    });
  },
  [DELETE_KONSUMEN_SUCCESS]: (state, action) => {
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
