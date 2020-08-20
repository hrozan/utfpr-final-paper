import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { API_URL } from "../config"

const request = async (config: AxiosRequestConfig): Promise<AxiosResponse> => {
  config.baseURL = API_URL
  return axios(config)
}

export const post = async (url: string, payload: any): Promise<AxiosResponse> => {
  return request({ method: "POST", url, data: payload })
}
