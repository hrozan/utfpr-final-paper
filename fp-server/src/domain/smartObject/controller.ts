import { Request, Response } from "express"

const { MQTT_BROKER_USERNAME, MQTT_BROKER_PASSWORD } = process.env

export async function getCredentials(request: Request, response: Response) {
  response.json({ userName: MQTT_BROKER_USERNAME || "", password: MQTT_BROKER_PASSWORD || "" })
}
