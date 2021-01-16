import React, { useCallback, useEffect, useRef, useState } from 'react'
import FormData from 'form-data'
import { useDispatch, useSelector } from 'react-redux'
import { todoActions } from '../store/actions/todoActions'
import { useHistory } from 'react-router-dom'
import { locationActions } from '../store/actions/locationActions'
import { Loader } from '../components'

export const CreatePage = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { success, loading, error: requestError } = useSelector(
    state => state.request
  )
  const [error, setError] = useState({})

  useEffect(() => {
    if (requestError) {
      setError(requestError)
    }
  }, [requestError, dispatch])

  const form = useRef(null)
  const textarea = useRef(null)

  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [text, setText] = useState('')

  useEffect(() => {
    if (window.M) {
      window.M.updateTextFields()
      window.M.textareaAutoResize(textarea.current)
    }
  }, [])

  const changeEmailHandler = useCallback(event => {
    setEmail(event.target.value)
  }, [])

  const changeNameHandler = useCallback(event => {
    setUsername(event.target.value)
  }, [])

  const changeTextHandler = useCallback(event => {
    setText(event.target.value)
  }, [])

  const createTodoHandler = useCallback(
    event => {
      event.preventDefault()
      setError({})

      const data = new FormData(form.current)

      dispatch(todoActions.createTodo(data))
    },
    [dispatch]
  )

  useEffect(() => {
    if (success) {
      history.push('/')
      dispatch(locationActions.push('/'))
    }
  }, [dispatch, success, history])

  return (
    <div className='container center'>
      <h2>Создать задачу</h2>

      <div className='row'>
        <div className='col s8 offset-s2'>
          <div className='card'>
            <form className='card-content' ref={form}>
              {loading && (
                <div className='loader'>
                  <Loader />
                </div>
              )}

              <div className='row'>
                <div className='input-field col s12'>
                  <input
                    className={error?.email && 'invalid'}
                    name='email'
                    id='email'
                    type='email'
                    onChange={changeEmailHandler}
                    value={email}
                  />
                  <label htmlFor='email'>Введите E-mail</label>
                  <span
                    className='helper-text error'
                    data-error={error.email}
                  ></span>
                </div>
              </div>

              <div className='row'>
                <div className='input-field col s12'>
                  <input
                    className={error?.username && 'invalid'}
                    name='username'
                    id='username'
                    type='text'
                    onChange={changeNameHandler}
                    value={username}
                  />
                  <label htmlFor='username'>Введите Имя</label>
                  <span
                    className='helper-text error'
                    data-error={error.username}
                  ></span>
                </div>
              </div>

              <div className='row'>
                <div className='input-field col s12'>
                  <textarea
                    ref={textarea}
                    className={
                      error?.username
                        ? ' materialize-textarea invalid'
                        : 'materialize-textarea'
                    }
                    name='text'
                    id='text'
                    type='text'
                    onChange={changeTextHandler}
                    value={text}
                  />
                  <label htmlFor='text'>Введите текст задачи</label>
                  <span
                    className='helper-text error'
                    data-error={error.text}
                  ></span>
                </div>
              </div>

              <button className='btn' onClick={createTodoHandler}>
                Создать задачу
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
