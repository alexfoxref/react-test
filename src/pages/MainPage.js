import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Pagination, Sort, TodoList } from '../components'
import { todoActions } from '../store/actions/todoActions'

export const MainPage = () => {
  const dispatch = useDispatch()
  const { page, total } = useSelector(state => state.todo)

  useEffect(() => {
    dispatch(todoActions.getTodos())
  }, [page, dispatch])

  return (
    <>
      <div className='container center'>
        <h2>Список задач</h2>

        {total > 0 && <Sort />}
        <TodoList />
        <Pagination />
      </div>
    </>
  )
}
