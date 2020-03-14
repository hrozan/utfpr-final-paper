import MQTT, { Message, Client } from "paho-mqtt"
import urlJoin from "url-join"
import { store } from "../../store"
import { BROKER_URL, BROKER_PORT, API_URL } from "../../config"
import * as http from "../http"
import { onConnected, onMessage } from "./mqttActions"

async function getCredentials() {
  const url = urlJoin(API_URL, "mqtt", "credentials")
  const response = await http.get(url)
  return response.data
}
export async function connect(): Promise<Client> {
  const { auth } = store.getState()
  const clientID = auth.user.id

  const client: Client = new MQTT.Client(BROKER_URL, BROKER_PORT, "/ws", clientID)
  client.onMessageArrived = onMessageArrived

  const { userName, password } = await getCredentials()

  return new Promise((resolve, reject) => {
    const onConnect: MQTT.OnSuccessCallback = () => {
      client.subscribe("main")
      store.dispatch(onConnected())
      resolve(client)
    }

    const onError: MQTT.OnFailureCallback = (error) => {
      reject(error)
    }

    const config: MQTT.ConnectionOptions = {
      userName,
      password,
      useSSL: true,
      onSuccess: onConnect,
      onFailure: onError
    }

    client.connect(config)
  })
}
function onMessageArrived(message: Message) {
  const { payloadString } = message
  const payload = JSON.parse(payloadString)
  store.dispatch(onMessage(payload))
}
