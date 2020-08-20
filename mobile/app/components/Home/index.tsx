import React, { useContext, useEffect } from "react"
import { Content, H1, Text } from "native-base"
import Card from "../../../app/layout/Card"
import Button from "../../../app/layout/Button"
import { AuthContext } from "../Auth"
import { mqttConnect, mqttDisconnect } from "../../../app/infra/client/mqtt"

const Home = () => {

  const authContext = useContext(AuthContext)
  const onLogout = () => {
    authContext.logout()
    mqttDisconnect()
  }
  useEffect(() => {
    mqttConnect()
  }, [])

  return (
    <Content>
      <Card>
        <H1>Home</H1>
        <Button title="Logout" onPress={onLogout} />
      </Card>
    </Content>
  )
}
export default Home
