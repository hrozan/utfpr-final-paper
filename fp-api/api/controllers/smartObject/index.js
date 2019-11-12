const { MQTT_BROKER_USERNAME, MQTT_BROKER_PASSWORD } = process.env

const smartObject = {
	async read(req, res) {
		res.json({ cpu: 10, temp: 24, memory: 60 })
	},
	async getCredentials(req, res) {
		res.json({ userName: MQTT_BROKER_USERNAME || "", password: MQTT_BROKER_PASSWORD || "" })
	}
}

module.exports = smartObject
