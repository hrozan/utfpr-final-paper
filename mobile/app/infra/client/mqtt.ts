import mqtt, { ConnectionOptions } from "paho-mqtt"

const BROKER_URI = "hrozan.xyz"
const client = new mqtt.Client(BROKER_URI, 8083, "clientId")

client.onMessageArrived = (message) => {
  console.log(message.payloadString)
}

export const mqttConnect = () => {
  const onSuccess = () => {
    console.log("Connected")
    client.subscribe("system/data")
  }

  const config: ConnectionOptions = {
    onSuccess,
    useSSL: true,
    userName: "hrozan",
    password: "t1i2i5",
  }
  client.connect(config)
}

export const mqttDisconnect = () => {
  client.disconnect()
}
