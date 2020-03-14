export const LOGIN = "LOGIN"
export const LOGOUT = "LOGOUT"

export function login(user: object) {
  return {
    type: LOGIN,
    payload: user
  }
}

export function logout() {
  return {
    type: LOGOUT
  }
}
