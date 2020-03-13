import axios, { AxiosRequestConfig, Method } from "axios"
import { store } from "../../store"

async function _request(method: Method, url: string, payload?: object) {
  const config: AxiosRequestConfig = {
    headers: {},
    method,
    url,
    data: payload
  }
  const state = store.getState()
  const { isAuthenticated, user } = state.auth
  if (isAuthenticated) {
    config.headers.Authorization = user.token
  }
  return axios(config)
}

export async function post(url: string, payload: object) {
  return _request("POST", url, payload)
}
export async function get(url: string) {
  return _request("GET", url)
}
