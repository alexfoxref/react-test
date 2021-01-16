import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { AuthPage, CreatePage, MainPage, TodoPage } from '../pages'

export const useRoutes = isAuthorization => {
  return (
    <Switch>
      <Route path='/' exact component={MainPage} />
      <Route path='/create' component={CreatePage} />
      {isAuthorization ? (
        <Route path='/edit/:id'>
          <TodoPage edit={true} />
        </Route>
      ) : (
        <>
          <Route path='/task/:id'>
            <TodoPage edit={false} />
          </Route>
          <Route path='/auth' component={AuthPage} />
        </>
      )}
      <Redirect to='/' />
    </Switch>
  )
}
