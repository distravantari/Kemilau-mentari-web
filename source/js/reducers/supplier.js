import { Map, List } from 'immutable';

import {
  GET_SUPPLIER_START,
  GET_SUPPLIER_ERROR,
  GET_SUPPLIER_SUCCESS,

  ADD_SUPPLIER_START,
  ADD_SUPPLIER_ERROR,
  ADD_SUPPLIER_SUCCESS,

  EDIT_SUPPLIER_START,
  EDIT_SUPPLIER_ERROR,
  EDIT_SUPPLIER_SUCCESS,

  DELETE_SUPPLIER_START,
  DELETE_SUPPLIER_ERROR,
  DELETE_SUPPLIER_SUCCESS,
} from 'actions/supplier';

const initialState = Map({
  supplier: Map({}),
  loading: false,
  error: null,
  shouldUpdate: false,
});

const actionsMap = {
  [GET_SUPPLIER_START]: (state) => {
    return state.merge({
      loading: true,
      error: null,
    });
  },
  [GET_SUPPLIER_ERROR]: (state, action) => {
    return state.merge({
      loading: false,
      error: action.error,
    });
  },
  [GET_SUPPLIER_SUCCESS]: (state, action) => {
    return state.merge({
      loading: false,
      error: null,
      supplier: Map({ ...action.data }),
      shouldUpdate: false,
    });
  },
  [ADD_SUPPLIER_START]: (state) => {
    return state.merge({
      loading: true,
      error: null,
    });
  },
  [ADD_SUPPLIER_ERROR]: (state, action) => {
    return state.merge({
      loading: false,
      error: action.error,
    });
  },
  [ADD_SUPPLIER_SUCCESS]: (state, action) => {
    return state.merge({
      loading: false,
      error: null,
      shouldUpdate: true,
    });
  },
  [EDIT_SUPPLIER_START]: (state) => {
    return state.merge({
      loading: true,
      error: null,
    });
  },
  [EDIT_SUPPLIER_ERROR]: (state, action) => {
    return state.merge({
      loading: false,
      error: action.error,
    });
  },
  [EDIT_SUPPLIER_SUCCESS]: (state, action) => {
    return state.merge({
      loading: false,
      error: null,
      shouldUpdate: true,
    });
  },
  [DELETE_SUPPLIER_START]: (state) => {
    return state.merge({
      loading: true,
      error: null,
    });
  },
  [DELETE_SUPPLIER_ERROR]: (state, action) => {
    return state.merge({
      loading: false,
      error: action.error,
    });
  },
  [DELETE_SUPPLIER_SUCCESS]: (state, action) => {
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
