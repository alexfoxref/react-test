import { initialState, types } from '../constants'

export const locationReducer = (state = initialState.location, action) => {
  switch (action.type) {
    case types.SET_LOCATION:
      return { ...state, url: action.payload }
    default:
      return state
  }
}
