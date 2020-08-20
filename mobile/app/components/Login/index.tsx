import React from "react"
import { ToastAndroid } from "react-native"
import Button from "../../layout/Button"
import Card from "../../layout/Card"
import TextField from "../../layout/TextField"
import { login } from "./service"
import { saveItemOnStorage } from "../../infra/storage"
import { Content } from "native-base"

export const TOKEN_KEY = "token"
const Login: React.FC = () => {
  const [email, onChangeEmail] = React.useState("")
  const [password, onChangePassword] = React.useState("")

  const onSubmit = async () => {
    try {
      const token = await login({ email, password })
      if (!token) {
        ToastAndroid.show("Error On Login", ToastAndroid.SHORT)
      }

      // connect()
      await saveItemOnStorage(TOKEN_KEY, token)
    } catch (e) {
      ToastAndroid.show("Error On Login", ToastAndroid.SHORT)
    }
  }

  return (
    <Content>
      <Card>
        <TextField
          testID="email-input"
          label={"Email"}
          value={email}
          onChangeText={(value) => onChangeEmail(value)}
        />
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

export default Login
