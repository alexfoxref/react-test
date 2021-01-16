import { types } from '../constants'

export const requestActions = {
  setLoading(bool) {
    return {
      type: types.SET_LOADIN,
      payload: bool,
    }
  },

  setError(errMessage) {
    return {
      type: types.SET_ERROR,
      payload: errMessage,
    }
  },

  setSuccess(bool) {
    return {
      type: types.SET_SUCCESS,
      payload: bool,
    }
  },

  endRequest: () => dispatch => {
    dispatch(requestActions.setLoading(false))
    dispatch(requestActions.setSuccess(false))
    dispatch(requestActions.setError(null))
  },
}
