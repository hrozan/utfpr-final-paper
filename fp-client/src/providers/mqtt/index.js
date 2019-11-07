import MQTT from "paho-mqtt/paho-mqtt"
import { store } from "../../store"
import { BROKER_URL, BROKER_PORT, MQTT_PASSWORD } from "../../config"

const MQTTProvider = {
  init(password = MQTT_PASSWORD) {
    const { auth } = store.getState()
    const clientID = auth.user.id
    const userName = auth.user.username

    this.client = new MQTT.Client(BROKER_URL, BROKER_PORT, "/ws", clientID)
    this.client.onMessageArrived = this.onMessageArrived

    const config = {
      onSuccess: () => {
        this.onConnect()
      },
      userName,
      password,
      useSSL: true
    }

    this.client.connect(config)
  },
  onMessageArrived(message) {
    console.log(message.payloadString)
  },
  onConnect() {
    console.info("MQTT Connected")
    this.client.subscribe("test")
  }
}
export default MQTTProvider
