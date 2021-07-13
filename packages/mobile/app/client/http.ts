import axios, { AxiosRequestConfig } from "axios"
import { API_URL } from "../config"

const request = async (config: AxiosRequestConfig) => {
	config.baseURL = API_URL
	return axios(config)
}

export const httpPost = async (url: string, payload: any) => request({ method: "POST", url, data: payload })

export const httpPrivateGet = async (url: string, token: string) => request({ method: "GET", url, headers: { token } })
