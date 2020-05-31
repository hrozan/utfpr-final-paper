import React from "react"
import { ToastAndroid } from "react-native"
import Button from "../layout/Button"
import Card from "../layout/Card"
import TextField from "../layout/TextField"
import BaseWrapper from "../layout/BaseWrapper"
import Centered from "../layout/Centered"
import service from "./service"
import storage from "../../infra/storage"
import { Spinner } from "native-base"

export const TOKEN_KEY = "token"
const Login: React.FC = () => {
  const [email, onChangeEmail] = React.useState("")
  const [password, onChangePassword] = React.useState("")
  const [isLoading, setLoading] = React.useState(false)

  const onSubmit = async () => {
    setLoading(true)
    try {
      const token = await service.login({ email, password })
      if (!token) {
        ToastAndroid.show("Error On Login", ToastAndroid.SHORT)
      }

      await storage.setItem(TOKEN_KEY, token)
    } catch (e) {
      ToastAndroid.show("Error On Login", ToastAndroid.SHORT)
    } finally {
      setLoading(false)
    }
  }

  return (
    <BaseWrapper>
      {isLoading ? (
        <Spinner />
      ) : (
        <Centered>
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
        </Centered>
      )}
    </BaseWrapper>
  )
}

export default Login
