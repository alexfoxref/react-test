import { types } from '../constants'

export const locationActions = {
  setLocation(url) {
    return {
      type: types.SET_LOCATION,
      payload: url,
    }
  },

  push(to) {
    const newUrl = new URL(to, window.location.origin)

    return this.setLocation(newUrl)
  },
}
