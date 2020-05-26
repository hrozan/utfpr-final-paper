import React from "react"
import Button from "../../layout/Button"
import Card from "../../layout/Card"
import TextField from "../../layout/TextField"
import BaseWrapper from "../../layout/BaseWrapper"
import Centered from "../../layout/Centered"

import service from "./service"
import { ToastAndroid } from "react-native"

const Login: React.FC = () => {
  const [email, onChangeEmail] = React.useState("")
  const [password, onChangePassword] = React.useState("")

  const onSubmit = async () => {
    console.info("Login")
    try {
      const token = await service.login({ email, password })
      console.log(token)
    } catch (e) {
      ToastAndroid.show("Error On Login", ToastAndroid.SHORT)
    }
  }

  return (
    <BaseWrapper>
      <Centered>
        <Card>
          <TextField label={"Email"} value={email} onChangeText={(value) => onChangeEmail(value)} />
          <TextField
            label={"Password"}
            password
            value={password}
            onChangeText={(value) => onChangePassword(value)}
          />
          <Button title={"Log In"} onPress={onSubmit} />
        </Card>
      </Centered>
    </BaseWrapper>
  )
}

export default Login
