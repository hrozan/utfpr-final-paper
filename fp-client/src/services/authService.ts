import http from "../providers/http"
import urlJoin from "url-join"
import { API_URL } from "../config"
import { store } from "../store"
import { login as actionLogin, logout as actionLogout } from "../components/auth/authActions"

export type LoginPayload = {
  username: string
  password: string
}

export async function login(payload: LoginPayload) {
  const url = urlJoin(API_URL, "auth", "login")
  const result = await http.post(url, payload)
  const user = result.data

  store.dispatch(actionLogin(user))
  return result.data
}
export function logout() {
  store.dispatch(actionLogout())
}
