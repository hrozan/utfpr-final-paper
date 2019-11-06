import MQTT from "paho-mqtt/paho-mqtt"

const MQTTProvider = {
  init() {
    this.client = new MQTT.Client("hrozan.xyz", 8883, "/ws", "3143jkl12341")

    this.client.onMessageArrived = this.onMessageArrived
    const config = {
      onSuccess: this.onConnect,
      userName: "hrozan",
      password: "t1i2i5"
    }
    this.client.connect(config)
  },
  onConnect() {
    console.log("Connected!")
    const config = {
      onSuccess() {
        console.log("Subscrib", this)
      }
    }
    this.client.subscribe("test", config)
  },
  onMessageArrived(message) {
    console.log(message)
  }
}
export default MQTTProvider
