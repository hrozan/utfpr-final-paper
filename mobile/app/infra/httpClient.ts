import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios"
import { API_URL } from "./config"

export default {
  async _request(method: Method, url: string, payload: any): Promise<AxiosResponse> {
    const config: AxiosRequestConfig = {
      baseURL: API_URL,
      url,
      method,
      data: payload,
    }
    return axios(config)
  },
  async post(url: string, payload: any): Promise<AxiosResponse> {
    return this._request("POST", url, payload)
  },
}
