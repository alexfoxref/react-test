import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { todoActions } from '../../store/actions/todoActions'
import styles from './Sort.module.scss'

export const Sort = () => {
  const { sort_field, sort_direction } = useSelector(state => state.todo.sort)
  const select = useRef(null)
  const dispatch = useDispatch()
  const [direction, setDirection] = useState(
    sort_direction === 'asc' ? true : false
  )
  const [param, setParam] = useState(sort_field)

  useEffect(() => {
    let instance = null
    if (window.M) {
      instance = window.M.FormSelect.init(select.current)
    }

    return () => {
      if (instance) {
        instance.destroy()
      }
    }
  }, [])

  const changeDirectionHandler = useCallback(
    event => {
      setDirection(prev => !prev)
      dispatch(
        todoActions.setSort({
          sort_field: param,
          sort_direction: !direction ? 'asc' : 'desc',
        })
      )
    },
    [dispatch, param, direction]
  )

  const changeParamHandler = useCallback(
    event => {
      setParam(event.target.value)
      dispatch(
        todoActions.setSort({
          sort_field: event.target.value,
          sort_direction: direction ? 'asc' : 'desc',
        })
      )
    },
    [dispatch, param, direction]
  )

  return (
    <div className={styles.sort}>
      <h5>Параметры сортировки:</h5>

      <div className={`input-field ${styles.select}`}>
        <select ref={select} value={param} onChange={changeParamHandler}>
          <option value='id'>Не выбран</option>
          <option value='username'>Имя пользователя</option>
          <option value='email'>E-mail</option>
          <option value='status'>Статус</option>
        </select>
      </div>

      <button
        className='btn primary'
        onClick={changeDirectionHandler}
        data-value={direction}
      >
        {direction ? (
          <i className='material-icons'>keyboard_arrow_down</i>
        ) : (
          <i className='material-icons'>keyboard_arrow_up</i>
        )}
      </button>
    </div>
  )
}
