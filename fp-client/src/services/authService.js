import axios from "axios"
import urlJoin from "url-join"
import { API_URL } from "../config"

export const TOKEN_KEY = "jwt_token"

const authService = {
  async login(payload) {
    const url = urlJoin(API_URL, "auth", "login")
    const result = await axios.post(url, payload)

    const { token } = result.data
    sessionStorage.setItem(TOKEN_KEY, token)

    return result.data
  }
}

export default authService
