import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { locationActions } from './store/actions/locationActions'
import { Navbar } from './components'
import { useRoutes } from './routes/useRoutes'

function App() {
  const {
    location: { url },
    auth: { isAuthorization },
  } = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    const newUrl = new URL(window.location.href)

    dispatch(locationActions.setLocation(newUrl))
  }, [dispatch])

  const routes = useRoutes(isAuthorization)

  return (
    <>
      <Navbar isAuthorization={isAuthorization} url={url} />
      {routes}
    </>
  )
}

export default App
