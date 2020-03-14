import { LOGOUT, LOGIN } from "./authActions"


const INITIAL_STATE = {
  user: {},
  isAuthenticated: false
}

// todo: read this e refactor https://redux.js.org/recipes/usage-with-typescript/
export default function authReducer(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true
      }
    case LOGOUT:
      return { ...INITIAL_STATE }
    default:
      return state
  }
}
