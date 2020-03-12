/* eslint-disable no-undef */
export const API_URL: string = process.env.REACT_APP_API_URL || ""
export const BROKER_URL: string = process.env.REACT_APP_BROKER_URL || ""
export const BROKER_PORT: number = process.env.REACT_APP_BROKER_PORT ? parseInt(process.env.REACT_APP_BROKER_PORT) : 0
export const MQTT_PASSWORD: string = process.env.REACT_APP_BROKER_PASSWORD || ""
