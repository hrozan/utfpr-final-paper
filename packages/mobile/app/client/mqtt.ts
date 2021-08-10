import mqtt, { ConnectionOptions } from "paho-mqtt"

export interface MqttConfig {
	userName: string
	password: string
	onUpdate: (payload: string) => void
}

const BROKER_URI = "hrozan.xyz"
const client = new mqtt.Client(BROKER_URI, 8083, "3bd0aa83-ce73-4346-93a1-b04458448e54")

export const mqttConnect = (config: MqttConfig) => {
	client.onMessageArrived = (message) => {
		config.onUpdate(message.payloadString)
	}

	const onSuccess = () => {
		console.log("Mqtt client connected successfully")
		client.subscribe("system/data")
	}

	const connectionOptions: ConnectionOptions = {
		onSuccess,
		onFailure: (e) => {
			console.log(e)
		},
		useSSL: true,
		userName: config.userName,
		password: config.password,
	}

	try {
		client.connect(connectionOptions)
	} catch (e) {
		console.log("Mqtt Already Connected")
	}
}

export const mqttDisconnect = () => {
	client.disconnect()
	console.log("Mqtt client disconnected successfully")
}
