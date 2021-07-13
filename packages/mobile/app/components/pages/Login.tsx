import React, { useContext, useState } from "react"
import { useHistory } from "react-router-native"
import { ToastAndroid } from "react-native"
import { Button } from "../layout/Button"
import { Card } from "../layout/Card"
import { TextField } from "../layout/TextField"
import { Content } from "native-base"
import { AuthContext } from "../lib/Auth"
import { httpPost } from "../../client/http"

export interface Credentials {
	email: string
	password: string
}

export const loginUrl = "/auth/login"
const getTokenFromApi = async (credentials: Credentials): Promise<string> => {
	const response = await httpPost(loginUrl, credentials)
	return response.data.token
}

export const Login: React.FC = () => {
	const history = useHistory()
	const authContext = useContext(AuthContext)
	const [email, onChangeEmail] = useState("")
	const [password, onChangePassword] = useState("")

	const onSubmit = async () => {
		try {
			const token = await getTokenFromApi({ email, password })
			if (!token) {
				ToastAndroid.show("Error On Login", ToastAndroid.SHORT)
			}

			await authContext.login(token)
			history.push("/")
		} catch (e) {
			ToastAndroid.show("Error On Login", ToastAndroid.SHORT)
		}
	}

	return (
		<Content>
			<Card>
				<TextField testID="email-input" label={"Email"} value={email} onChangeText={(value) => onChangeEmail(value)} />
				<TextField
					testID="password-input"
					label={"Password"}
					password
					value={password}
					onChangeText={(value) => onChangePassword(value)}
				/>
				<Button testID="login-button" title={"Log In"} onPress={onSubmit} />
			</Card>
		</Content>
	)
}
