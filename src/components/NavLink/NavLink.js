import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { locationActions } from '../../store/actions/locationActions'

export const NavLink = ({ to, children, action }) => {
  const {
    location: { url },
  } = useSelector(state => state)
  const dispatch = useDispatch()
  const history = useHistory()

  const changeLocationHandler = useCallback(
    event => {
      event.preventDefault()

      if (action) {
        action()
      }

      if (url && url.href.replace(url.origin, '') !== to) {
        history.push(to)
        dispatch(locationActions.push(to))
      }
    },
    [url, to, dispatch, history, action]
  )

  return (
    <a href='' onClick={changeLocationHandler}>
      {children}
    </a>
  )
}
