import axios from "axios"
import urlJoin from "url-join"
import { API_URL } from "../../config"
import { store } from "../../store"
import { login as actionLogin, logout as actionLogout } from "./authActions"

const authService = {
  async login(payload) {
    const url = urlJoin(API_URL, "auth", "login")
    const result = await axios.post(url, payload)
    const user = result.data

    store.dispatch(actionLogin(user))
    return result.data
  },
  logout() {
    store.dispatch(actionLogout())
  }
}

export default authService
