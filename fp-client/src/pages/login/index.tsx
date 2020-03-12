import React, { useState } from "react"
import { withRouter } from "react-router-dom"
import Button from "components/layout/atoms/Button"
import Card from "components/layout/atoms/Card"
import TextInput from "components/layout/molecules/TextInput"
import Form from "components/layout/molecules/Form"
import { login } from "services/authService"
import alert from "components/layout/organism/Alert"
import LoginPage from "components/layout/template/LoginPage"

type Props = {
  history: {
    push: (path: string) => void
  }
}

const Login = (props: Props) => {
  const [loading, setLoading] = useState(false)

  const submitHandler = async (data: object) => {
    try {
      setLoading(true)
      await login(data)
      props.history.push("/")
    } catch (error) {
      if (!error.response) {
        console.error(error)
        alert.show("Ops, something went wrong 🙁")
        return setLoading(false)
      }
      const { message } = error.response.data
      alert.show(message)
      setLoading(false)
    }
  }

  return (
    <LoginPage>
      <Form onSubmit={submitHandler}>
        <Card>
          <h1>Welcome {"👨‍🚀️"}</h1>
          <TextInput name="username" />
          <TextInput name="password" type="password" />
          <Button loading={loading}>Login</Button>
        </Card>
      </Form>
    </LoginPage>
  )
}

export default withRouter(Login)
