import { User } from "./types"
export const LOGIN = "auth/LOGIN"
export const LOGOUT = "auth/LOGOUT"

export interface AuthState {
  user: User
  isAuthenticated: boolean
}

interface LoginAction {
  type: typeof LOGIN
  payload: User
}

interface LogoutAction {
  type: typeof LOGOUT
}

type AuthAction = LoginAction | LogoutAction

const INITIAL_STATE: AuthState = {
  user: {
    id: "",
    username: "",
    token: "",
  },
  isAuthenticated: false,
}

export default function authReducer(
  state = INITIAL_STATE,
  action: AuthAction,
): AuthState {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      }
    case LOGOUT:
      return { ...INITIAL_STATE }
    default:
      return state
  }
}

export function login(user: User): LoginAction {
  return {
    type: LOGIN,
    payload: user,
  }
}

export function logout(): LogoutAction {
  return {
    type: LOGOUT,
  }
}
