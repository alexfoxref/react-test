import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../store/actions/authActions'
import FormData from 'form-data'
import { useHistory } from 'react-router-dom'
import { locationActions } from '../store/actions/locationActions'
import { Loader } from '../components'

export const AuthPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const form = useRef(null)

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

  useEffect(() => {
    if (window.M) {
      window.M.updateTextFields()
    }
  }, [])

  const loginHandler = useCallback(
    event => {
      event.preventDefault()
      setError({})

      const data = new FormData(form.current)

      dispatch(authActions.login(data))
    },
    [dispatch]
  )

  useEffect(() => {
    if (success) {
      history.push('/')
      dispatch(locationActions.push('/'))
    }
  }, [dispatch, success, history])

  const changeNameHandler = useCallback(event => {
    setUsername(event.target.value)
  }, [])

  const changePasswordHandler = useCallback(event => {
    setPassword(event.target.value)
  }, [])

  return (
    <div className='container center'>
      <h2>Вход в систему</h2>

      <div className='row'>
        <div className='col s6 offset-s3'>
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
                    data-error={error?.username}
                  ></span>
                </div>
              </div>

              <div className='row'>
                <div className='input-field col s12'>
                  <input
                    className={error?.password && 'invalid'}
                    name='password'
                    id='password'
                    type='password'
                    onChange={changePasswordHandler}
                    value={password}
                  />
                  <label htmlFor='password'>Введите пароль</label>
                  <span
                    className='helper-text error'
                    data-error={error?.password}
                  ></span>
                </div>
              </div>

              <button className='btn' onClick={loginHandler} disabled={loading}>
                Войти
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
