import MQTT from "paho-mqtt/paho-mqtt"
import urlJoin from "url-join"
import { store } from "../../store"
import { BROKER_URL, BROKER_PORT, API_URL } from "../../config"
import http from "../http"

const MQTTProvider = {
  async getCredentials() {
    const url = urlJoin(API_URL, "mqtt", "credentials")
    const response = await http.get(url)
    return response.data
  },
  async connect() {
    const { auth } = store.getState()
    const clientID = auth.user.id

    this.client = new MQTT.Client(BROKER_URL, BROKER_PORT, "/ws", clientID)
    this.client.onMessageArrived = this.onMessageArrived

    const { userName, password } = await this.getCredentials()

    return new Promise((resolve, reject) => {
      const onConnect = () => {
        this.client.subscribe("test")
        resolve()
      }

      const config = {
        userName,
        password,
        useSSL: true,
        onSuccess: () => {
          onConnect()
        },
        onFailure: e => {
          reject(e)
        }
      }

      this.client.connect(config)
    })
  },
  onMessageArrived(message) {
    console.log(message.payloadString)
  }
}
export default MQTTProvider
