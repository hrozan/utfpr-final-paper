import mqtt, { ConnectionOptions } from 'paho-mqtt'

export interface MqttConfig {
	userName: string
	password: string
	onUpdate: (payload: string) => void
}

const BROKER_URI = 'hrozan.xyz'
const client = new mqtt.Client(BROKER_URI, 8083, 'clientId')

export const mqttConnect = (config: MqttConfig) => {
	client.onMessageArrived = (message) => {
		config.onUpdate(message.payloadString)
	}

	const onSuccess = () => {
		console.log('Mqtt client connected successfully')
		client.subscribe('system/data')
	}

	const connectionOptions: ConnectionOptions = {
		onSuccess,
		useSSL: true,
		userName: config.userName,
		password: config.password,
	}

	try {
		client.connect(connectionOptions)
	} catch (e) {
		console.log('Mqtt Already Connected')
	}
}

export const mqttDisconnect = () => {
	client.disconnect()
	console.log('Mqtt client disconnected successfully')
}
