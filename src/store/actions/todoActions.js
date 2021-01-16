import { config } from '../../config'
import { getResponseMessage, useMessage } from '../../hooks/useMessage'
import { getData, postData } from '../../services/services'
import { types } from '../constants'
import { authActions } from './authActions'
import { requestActions } from './requestActions'

export const todoActions = {
  setTodos(todos) {
    return {
      type: types.SET_TODOS,
      payload: todos,
    }
  },

  getTodos: () => async (dispatch, getState) => {
    try {
      dispatch(requestActions.setSuccess(false))
      dispatch(requestActions.setLoading(true))

      const {
        todo: {
          page,
          sort: { sort_field, sort_direction },
        },
      } = getState()

      const res = await getData(
        `/?page=${page}&sort_field=${sort_field}&sort_direction=${sort_direction}&`
      )

      if (res.status === 'ok') {
        dispatch(requestActions.setSuccess(true))

        dispatch(
          todoActions.setTodos({
            data: res.message.tasks,
            total: +res.message.total_task_count,
          })
        )
      } else {
        if (res.message) {
          dispatch(requestActions.setError(res.message))
        } else {
          throw new Error('Ошибка при загрузке задач.')
        }
      }
    } catch (e) {
      useMessage(e.message || 'Ошибка!', true)
    } finally {
      dispatch(requestActions.endRequest())
    }
  },

  createTodo: data => async dispatch => {
    try {
      dispatch(requestActions.setSuccess(false))
      dispatch(requestActions.setLoading(true))

      const res = await postData('/create?', data)

      if (res.status === 'ok') {
        dispatch(requestActions.setSuccess(true))

        dispatch({
          type: types.ADD_TODO,
          payload: data,
        })

        useMessage(getResponseMessage('Задача успешно создана.'))
      } else {
        if (res.message) {
          dispatch(requestActions.setError(res.message))
        } else {
          throw new Error('Ошибка при создании задачи.')
        }
      }
    } catch (e) {
      useMessage(e.message || 'Ошибка!', true)
    } finally {
      dispatch(requestActions.endRequest())
    }
  },

  updateTodo: (id, data) => async dispatch => {
    try {
      dispatch(requestActions.setSuccess(false))
      dispatch(requestActions.setLoading(true))

      const body = new FormData()

      Object.entries(data).forEach(([key, value]) => body.append(key, value))

      const token = JSON.parse(localStorage.getItem(config.userData) || '{}')
        .token

      body.append('token', token)

      if (!token) {
        dispatch(authActions.logout())

        throw new Error('Ошибка авторизации.')
      }

      const res = await postData(`/edit/${id}?`, body)

      if (res.status === 'ok') {
        dispatch(requestActions.setSuccess(true))

        const { text, status, edited } = data

        dispatch({
          type: types.UPDATE_TODO,
          payload: {
            text,
            status,
            id,
            edited,
          },
        })

        useMessage(getResponseMessage('Задача успешно обновлена.'))
      } else {
        if (res.message) {
          dispatch(requestActions.setError(res.message))
        } else {
          throw new Error('Ошибка при обновлении задачи.')
        }
      }
    } catch (e) {
      useMessage(e.message || 'Ошибка!', true)
    } finally {
      dispatch(requestActions.endRequest())
    }
  },

  setPage(page = 1) {
    return {
      type: types.SET_PAGE,
      payload: page,
    }
  },

  setSort: sortParams => dispatch => {
    dispatch({
      type: types.SET_SORT,
      payload: sortParams,
    })

    try {
      dispatch(todoActions.getTodos())
    } catch (e) {}
  },
}
