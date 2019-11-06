import axios from "axios"

import { store } from "../../store"

const http = {
  async _request(method, url, payload) {
    const config = {
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
  },
  async post(url, payload) {
    return this._request("POST", url, payload)
  },
  async get(url) {
    return this._request("GET", url)
  }
}

export default http
