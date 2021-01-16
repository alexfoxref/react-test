import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { AuthPage, CreatePage, MainPage, TodoPage } from '../pages'

export const useRoutes = isAuthorization => {
  if (isAuthorization)
    return (
      <Switch>
        <Route path='/' exact component={MainPage} />
        <Route path='/create' component={CreatePage} />
        <Route path='/edit/:id'>
          <TodoPage edit={true} />
        </Route>

        <Redirect to='/' />
      </Switch>
    )

  return (
    <Switch>
      <Route path='/' exact component={MainPage} />
      <Route path='/create' component={CreatePage} />
      <Route path='/task/:id'>
        <TodoPage edit={false} />
      </Route>
      <Route path='/auth' component={AuthPage} />

      <Redirect to='/' />
    </Switch>
  )
}
