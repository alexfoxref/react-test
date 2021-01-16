import React, { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { config } from '../../config'
import { todoActions } from '../../store/actions/todoActions'
import styles from './Pagination.module.scss'

export const Pagination = () => {
  const dispatch = useDispatch()
  const { page, total } = useSelector(state => state.todo)
  const { loading } = useSelector(state => state.request)
  const pages = useMemo(() => {
    return Math.ceil(total / config.todosPerPage)
  }, [total])
  const pagination = useMemo(() => {
    return new Array(pages).fill('').map((_, idx) => ({
      number: idx + 1,
      activeClass: idx + 1 === page ? 'active' : '',
      id: `pagination-${idx}`,
    }))
  }, [page, pages])

  const setPageHandler = useCallback(
    number => {
      if (number !== page && number > 0 && number < pages + 1) {
        dispatch(todoActions.setPage(number))
      }
    },
    [page, dispatch, pages]
  )

  const buttonView = useCallback(
    ({ activeClass, id, number }) => {
      return (
        <li
          className={`${styles['pagination-button']}${' ' + activeClass}`}
          key={id}
        >
          <a onClick={() => setPageHandler(number)}>{number}</a>
        </li>
      )
    },
    [setPageHandler]
  )

  if (pages < 2 || loading) return null

  const paginationView = pagination.map(({ number, activeClass, id }, idx) => {
    if (pages <= config.paginationLimit * 2 + 1) {
      return buttonView({ number, activeClass, id })
    }
    if (page > config.paginationLimit + 2) {
      if (idx === 0) return buttonView({ number, activeClass, id })
      if (idx === 1) return <span key={id}>&nbsp; ... &nbsp;</span>
    } else if (page < pages - config.paginationLimit - 1) {
      if (idx === pages - 2) return <span key={id}>&nbsp; ... &nbsp;</span>
      if (idx === pages - 1) return buttonView({ number, activeClass, id })
    }
    if (
      idx >= page - 1 - config.paginationLimit &&
      idx <= page - 1 + config.paginationLimit
    ) {
      return buttonView({ number, activeClass, id })
    }
  })

  const arrowLeftClass = `waves-effect ${styles['pagination-button']}${
    page < 2 ? ' disabled' : ''
  }`

  const arrowRightClass = `waves-effect ${styles['pagination-button']}${
    page > pages - 1 ? ' disabled' : ''
  }`

  return (
    <div className='center'>
      <ul className='pagination'>
        <li className={arrowLeftClass}>
          <a onClick={() => setPageHandler(page - 1)}>
            <i className='material-icons'>chevron_left</i>
          </a>
        </li>

        {paginationView}

        <li className={arrowRightClass}>
          <a onClick={() => setPageHandler(page + 1)}>
            <i className='material-icons'>chevron_right</i>
          </a>
        </li>
      </ul>
    </div>
  )
}
