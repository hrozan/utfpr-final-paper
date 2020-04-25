import React from "react"
import Home from "./src/routes/home"
import { NativeRouter, Route } from "react-router-native"
import { Container, Header } from "native-base"
export default () => {
  return (
    <NativeRouter>
      <Header />
      <Container>
        <Route path="/" component={Home} />
      </Container>
    </NativeRouter>
  )
}
