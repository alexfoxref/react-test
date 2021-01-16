import { config } from '../config'

export const initialState = {
  location: {
    url: null,
  },
  auth: {
    isAuthorization:
      JSON.parse(localStorage.getItem(config.userData) || '{}').token || false,
  },
  todo: {
    data: [],
    page: 1,
    sort: { sort_field: 'id', sort_direction: 'asc' },
    total: 0,
  },
  request: {
    success: false,
    loading: false,
    error: null,
  },
}

export const types = {
  SET_LOCATION: 'LOCATION/SET_LOCATION',
  LOGIN: 'AUTH/LOGIN',
  LOGOUT: 'AUTH/LOGOUT',
  SET_TODOS: 'TODO/SET_TODOS',
  SET_PAGE: 'TODO/SET_PAGE',
  SET_SORT: 'TODO/SET_SORT',
  ADD_TODO: 'TODO/ADD_TODO',
  UPDATE_TODO: 'TODO/UPDATE_TODO',
  SET_LOADIN: 'REQUEST/SET_LOADIN',
  SET_ERROR: 'REQUEST/SET_ERROR',
  SET_SUCCESS: 'REQUEST/SET_SUCCESS',
}
