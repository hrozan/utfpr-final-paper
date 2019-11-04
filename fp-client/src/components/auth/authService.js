import axios from "axios"
import urlJoin from "url-join"
import { API_URL } from "../../config"
import { store } from "../../store"
import { login as actionLogin, logout as actionLogout } from "./authActions"

export const TOKEN_KEY = "jwt_token"

const authService = {
  async login(payload) {
    const url = urlJoin(API_URL, "auth", "login")
    const result = await axios.post(url, payload)

    const { token, ...user } = result.data
    sessionStorage.setItem(TOKEN_KEY, token)

    store.dispatch(actionLogin(user))

    return result.data
  },
  logout() {
    sessionStorage.removeItem(TOKEN_KEY)
    store.dispatch(actionLogout())
  }
}

export default authService
