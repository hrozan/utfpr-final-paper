#!/usr/bin/env node
import mqtt from "mqtt"

console.log("start")
const client = mqtt.connect("mqtts://hrozan.xyz", { username: "user", password: "pass123" })

const delay = async (s: number): Promise<void> => new Promise((resolve) => setInterval(resolve, 1000 * s))

async function main(): Promise<void> {
	console.log("connected")
	// eslint-disable-next-line no-constant-condition
	while (true) {
		const payload = {
			cpu: 60,
			memory: 30,
		}
		console.log(payload)
		client.publish("system/data", JSON.stringify(payload))
		await delay(3)
	}
}

client.on("connect", main)
