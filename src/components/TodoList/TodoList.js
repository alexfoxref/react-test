import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Loader } from '..'
import { config } from '../../config'
import { locationActions } from '../../store/actions/locationActions'
import styles from './TodoList.module.scss'

const TodoList = () => {
  const { data, total, page } = useSelector(state => state.todo)
  const { loading } = useSelector(state => state.request)
  const history = useHistory()
  const dispatch = useDispatch()
  const { isAuthorization } = useSelector(state => state.auth)

  const openTodoHandler = useCallback(
    id => {
      const path = !isAuthorization ? `/task/${id}` : `/edit/${id}`

      history.push(path)
      dispatch(locationActions.push(path))
    },
    [isAuthorization, history, dispatch]
  )

  const statusTitle = useCallback(status => {
    return status.toString() === config.status.notExecuted.toString()
      ? 'Не выполнено'
      : status.toString() === config.status.executed.toString()
      ? 'Выполнено'
      : ''
  }, [])

  if (loading)
    return (
      <div className='container center'>
        <Loader />
      </div>
    )

  if (total === 0) return <p>Задач пока нет.</p>

  return (
    <table>
      <thead>
        <tr>
          <th className={styles.th}>
            <span>&#8470;</span>
          </th>
          <th className={styles.th}>
            <span>Имя</span>
          </th>
          <th className={styles.th}>
            <span>E-mail</span>
          </th>
          <th className={styles.th}>
            <span>Текст задачи</span>
          </th>
          <th className={styles.th}>
            <span>Статус задачи</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map(({ id, username, email, text, status, edited }, idx) => (
          <tr key={id} onClick={() => openTodoHandler(id)}>
            <td className={styles.td}>
              <span>{(page - 1) * config.todosPerPage + idx + 1}</span>
            </td>
            <td className={styles.td}>
              <span>{username}</span>
            </td>
            <td className={styles.td}>
              <span>{email}</span>
            </td>
            <td className={styles.td}>
              <span>{text}</span>
            </td>
            <td className={styles.td}>
              <span>{statusTitle(status)}</span>
              {edited && <span>Отредактировано администратором</span>}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TodoList
