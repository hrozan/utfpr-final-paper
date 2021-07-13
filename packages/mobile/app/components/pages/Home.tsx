import React, { useContext, useEffect, useState } from "react"
import { Content, H1, Text } from "native-base"
import { Card } from "../layout/Card"
import { Button } from "../layout/Button"
import { AuthContext } from "../lib/Auth"
import { mqttConnect, mqttDisconnect } from "../../client/mqtt"
import { getToken } from "../../provider/token"
import { httpPrivateGet } from "../../client/http"

const brokerUrl = "/broker"
const getBrokerCredential = async () => {
	const token = (await getToken()) || ""
	const response = await httpPrivateGet(brokerUrl, token)
	const userName = response.data.user as string
	const password = response.data.password as string
	return {
		userName,
		password,
	}
}

export function Home(): JSX.Element {
	const [cpu, setCpu] = useState("0")
	const [memory, setMemory] = useState("0")

	const onUpdate = (payload: string) => {
		const data = JSON.parse(payload)
		setCpu(data.cpu)
		setMemory(data.memory)
	}

	const authContext = useContext(AuthContext)
	const onLogout = () => {
		authContext.logout()
		mqttDisconnect()
	}

	const onStart = async () => {
		const credentials = await getBrokerCredential()
		mqttConnect({ ...credentials, onUpdate })
	}
	useEffect(() => {
		onStart()
	}, [])

	return (
		<Content>
			<Card>
				<H1>CPU</H1>
				<Text>{cpu}</Text>
			</Card>
			<Card>
				<H1>Memory</H1>
				<Text>{memory}</Text>
			</Card>
			<Card>
				<Button title="Logout" onPress={onLogout} />
			</Card>
		</Content>
	)
}
