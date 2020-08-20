import { post } from "../../infra/client/http"

export interface Credentials {
  email: string
  password: string
}

export const loginUrl = "/auth/login"
export const login = async (credentials: Credentials): Promise<string> => {
  const response = await post(loginUrl, credentials)
  return response.data.token
}
