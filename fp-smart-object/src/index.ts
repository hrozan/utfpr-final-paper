import mqtt, { IClientOptions, MqttClient } from "mqtt"

const options: IClientOptions = {
  port: 8883
}
const client: MqttClient = mqtt.connect("ws://hrozan.xyz/ws", options)

console.log(client)
client.on("connect", function() {
  console.log("connected")
  console.log(client.connected)
})

client.on("error", function(error) {
  console.log("test", error.message)
})

client.on("message", function(topic, message) {
  // message is Buffer
  console.log(message.toString())
  client.end()
})
