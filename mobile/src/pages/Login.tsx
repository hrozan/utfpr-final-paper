import React from "react"
import Button from "../components/Button"
import Card from "../components/Card"
import TextField from "../components/TextField"
import BaseWrapper from "../components/BaseWrapper"
import Centered from "../components/Centered"

export const Login: React.FC = () => (
  <BaseWrapper>
    <Centered>
      <Card>
        <TextField label={"Username"} />
        <TextField label={"Password"} />
        <Button title={"Log In"} onPress={() => {}} />
      </Card>
    </Centered>
  </BaseWrapper>
)
