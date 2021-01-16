import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { Loader } from '../components'
import { config } from '../config'
import { locationActions } from '../store/actions/locationActions'
import { todoActions } from '../store/actions/todoActions'

export const TodoPage = ({ edit }) => {
  const { id } = useParams()
  const { data } = useSelector(state => state.todo)
  const { isAuthorization } = useSelector(state => state.auth)
  console.log(data)
  const todo = data.find(({ id: i }) => i.toString() === id.toString())
  const history = useHistory()
  const dispatch = useDispatch()
  const textarea = useRef(null)
  const [text, setText] = useState(todo?.text || '')
  const [status, setStatus] = useState(todo?.status || 0)

  const { success, loading, error: requestError } = useSelector(
    state => state.request
  )
  const [error, setError] = useState({})

  useEffect(() => {
    if (requestError) {
      setError(requestError)
    }
  }, [requestError, dispatch])

  const changeTextHandler = useCallback(event => {
    setText(event.target.value)
  }, [])

  const changeStatusHandler = useCallback(event => {
    const newStatus = event.target.checked
      ? config.status.executed
      : config.status.notExecuted

    setStatus(newStatus)
  }, [])

  useEffect(() => {
    if (!todo || (edit && !isAuthorization)) {
      history.push('/')
      dispatch(locationActions.push('/'))
    } else {
      if (window.M) {
        window.M.updateTextFields()
        window.M.textareaAutoResize(textarea.current)
      }
    }
  }, [todo, edit, isAuthorization, dispatch, history])

  const booleanStatus = useMemo(() => {
    return status === config.status.notExecuted ? false : true
  }, [status])

  const title = useMemo(() => {
    return edit ? 'Страница редактирования задачи' : 'Страница задачи'
  }, [edit])

  const statusTitle = useMemo(() => {
    return edit
      ? 'Отметить выполненной'
      : booleanStatus
      ? 'Задача выполнена'
      : 'Задача не выполнена'
  }, [edit, booleanStatus])

  const changedData = useMemo(() => {
    return status !== todo?.status || text !== todo?.text
  }, [status, text, todo])

  const saveTodoHandler = useCallback(
    event => {
      event.preventDefault()
      setError({})

      if (changedData) {
        const data = {
          text,
          status,
          edited: text !== todo?.text,
        }

        dispatch(todoActions.updateTodo(id, data))
      }
    },
    [changedData, dispatch, id, status, text]
  )

  useEffect(() => {
    if (success) {
      history.push('/')
      dispatch(locationActions.push('/'))
    }
  }, [success, dispatch, history])

  if (!todo) return null

  return (
    <div className='container center'>
      <h2>{title}</h2>

      <div className='row'>
        <div className='col s8 offset-s2'>
          <div className='card'>
            <form className='card-content'>
              {loading && (
                <div className='loader'>
                  <Loader />
                </div>
              )}

              <div className='row'>
                <div className='input-field col s12'>
                  <input
                    className='black-text'
                    name='username'
                    id='username'
                    type='text'
                    value={todo.username}
                    disabled={true}
                  />
                  <label htmlFor='username' className='black-text'>
                    Имя
                  </label>
                  {error?.username && (
                    <span className='helper-text error'>{error.username}</span>
                  )}
                </div>
              </div>

              <div className='row'>
                <div className='input-field col s12'>
                  <input
                    className='black-text'
                    name='email'
                    id='email'
                    type='email'
                    value={todo.email}
                    disabled={true}
                  />
                  <label htmlFor='email' className='black-text'>
                    E-mail
                  </label>
                  {error?.email && (
                    <span className='helper-text error'>{error.email}</span>
                  )}
                </div>
              </div>

              <div className='row'>
                <div className='input-field col s12'>
                  <textarea
                    ref={textarea}
                    className='materialize-textarea black-text'
                    name='text'
                    id='text'
                    type='text'
                    onChange={changeTextHandler}
                    value={text}
                    disabled={!edit}
                  />
                  <label htmlFor='text' className='black-text'>
                    Текст задачи
                  </label>
                  {error?.text && (
                    <span className='helper-text error'>{error.text}</span>
                  )}
                </div>
              </div>

              <p>
                <label>
                  <input
                    type='checkbox'
                    className='filled-in'
                    checked={booleanStatus}
                    onChange={changeStatusHandler}
                    disabled={!edit}
                  />
                  <span className='black-text'>{statusTitle}</span>
                </label>
              </p>

              {edit && (
                <button
                  className='btn save'
                  onClick={saveTodoHandler}
                  disabled={!changedData}
                >
                  Сохранить изменения
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
