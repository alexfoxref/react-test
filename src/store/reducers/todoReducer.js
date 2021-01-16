import { initialState, types } from '../constants'

export const todoReducer = (state = initialState.todo, action) => {
  switch (action.type) {
    case types.SET_TODOS:
      return {
        ...state,
        data: action.payload.data,
        total: action.payload.total,
      }
    case types.ADD_TODO:
      return {
        ...state,
        data: [action.payload, ...state.data],
        total: state.total + 1,
      }
    case types.SET_PAGE:
      return { ...state, page: action.payload }
    case types.SET_SORT:
      return { ...state, sort: action.payload }
    case types.SET_EDITED:
      const newData = state.data.map(todo => {
        if (todo.id === action.payload.id) {
          todo.edited = action.payload.edited
        }

        return todo
      })
      return { ...state, data: [...newData] }
    default:
      return state
  }
}
