import { initialState, types } from '../constants'

export const authReducer = (state = initialState.auth, action) => {
  switch (action.type) {
    case types.LOGIN:
      return { ...state, isAuthorization: true }
    case types.LOGOUT:
      return { ...state, isAuthorization: false }
    default:
      return state
  }
}
