import { Credentials } from "./types"
import http from "../../infra/httpClient"

export const loginUrl = "/users/login"
export default {
  async login(credentials: Credentials): Promise<string> {
    const response = await http.post(loginUrl, credentials)
    return response.data.token
  },
}
