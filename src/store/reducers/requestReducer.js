import { initialState, types } from '../constants'

export const requestReducer = (state = initialState.request, action) => {
  switch (action.type) {
    case types.SET_LOADIN:
      return { ...state, loading: action.payload }
    case types.SET_ERROR:
      return { ...state, error: action.payload }
    case types.SET_SUCCESS:
      return { ...state, success: action.payload }
    default:
      return state
  }
}
