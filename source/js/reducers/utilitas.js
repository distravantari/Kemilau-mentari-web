import { Map, List } from 'immutable';

import {
  GET_UTILITAS_START,
  GET_UTILITAS_ERROR,
  GET_UTILITAS_SUCCESS,

  ADD_UTILITAS_START,
  ADD_UTILITAS_ERROR,
  ADD_UTILITAS_SUCCESS,

  EDIT_UTILITAS_START,
  EDIT_UTILITAS_ERROR,
  EDIT_UTILITAS_SUCCESS,

  DELETE_UTILITAS_START,
  DELETE_UTILITAS_ERROR,
  DELETE_UTILITAS_SUCCESS,
} from 'actions/utilitas';

const initialState = Map({
  utilitas: Map({}),
  loading: false,
  error: null,
  shouldUpdate: false,
});

const actionsMap = {
  [GET_UTILITAS_START]: (state) => {
    return state.merge({
      loading: true,
      error: null,
    });
  },
  [GET_UTILITAS_ERROR]: (state, action) => {
    return state.merge({
      loading: false,
      error: action.error,
    });
  },
  [GET_UTILITAS_SUCCESS]: (state, action) => {
    return state.merge({
      loading: false,
      error: null,
      utilitas: Map({ ...action.data }),
      shouldUpdate: false,
    });
  },
  [ADD_UTILITAS_START]: (state) => {
    return state.merge({
      loading: true,
      error: null,
    });
  },
  [ADD_UTILITAS_ERROR]: (state, action) => {
    return state.merge({
      loading: false,
      error: action.error,
    });
  },
  [ADD_UTILITAS_SUCCESS]: (state, action) => {
    return state.merge({
      loading: false,
      error: null,
      shouldUpdate: true,
    });
  },
  [EDIT_UTILITAS_START]: (state) => {
    return state.merge({
      loading: true,
      error: null,
    });
  },
  [EDIT_UTILITAS_ERROR]: (state, action) => {
    return state.merge({
      loading: false,
      error: action.error,
    });
  },
  [EDIT_UTILITAS_SUCCESS]: (state, action) => {
    return state.merge({
      loading: false,
      error: null,
      shouldUpdate: true,
    });
  },
  [DELETE_UTILITAS_START]: (state) => {
    return state.merge({
      loading: true,
      error: null,
    });
  },
  [DELETE_UTILITAS_ERROR]: (state, action) => {
    return state.merge({
      loading: false,
      error: action.error,
    });
  },
  [DELETE_UTILITAS_SUCCESS]: (state, action) => {
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
