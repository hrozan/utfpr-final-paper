import { LOGOUT, LOGIN } from "./authActions"

const INITIAL_STATE = {
  user: {},
  isAuthenticated: false
}

export default function authReducer(state = INITIAL_STATE, action) {
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
