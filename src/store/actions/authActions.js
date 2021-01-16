import { config } from '../../config'
import { getResponseMessage, useMessage } from '../../hooks/useMessage'
import { postData } from '../../services/services'
import { types } from '../constants'
import { requestActions } from './requestActions'

export const authActions = {
  authorization() {
    return {
      type: types.LOGIN,
    }
  },

  login: data => async dispatch => {
    try {
      dispatch(requestActions.setLoading(true))
      dispatch(requestActions.setSuccess(false))

      const res = await postData('/login?', data)

      if (res.status === 'ok') {
        dispatch(requestActions.setSuccess(true))
        const userData = { token: res.message.token }

        localStorage.setItem(config.userData, JSON.stringify(userData))

        dispatch(authActions.authorization())
        useMessage(getResponseMessage('Авторизация прошла успешно.'))
      } else {
        if (res.message) {
          dispatch(requestActions.setError(res.message))
        } else {
          throw new Error('Ошибка авторизации.')
        }
      }
    } catch (e) {
      useMessage(e.message || 'Ошибка!', true)
    } finally {
      dispatch(requestActions.endRequest())
    }
  },

  logout() {
    localStorage.removeItem(config.userData)

    return {
      type: types.LOGOUT,
    }
  },
}
