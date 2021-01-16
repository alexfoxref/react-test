import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { types } from './constants'
import {
  locationReducer,
  authReducer,
  todoReducer,
  requestReducer,
} from './reducers'

export default configureStore({
  reducer: {
    location: locationReducer,
    auth: authReducer,
    todo: todoReducer,
    request: requestReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: Object.values(types),
      },
    }).concat(thunk),
})
