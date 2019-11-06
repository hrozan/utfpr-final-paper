import React, { useState } from "react"
import * as PropTypes from "prop-types"
import { withRouter } from "react-router-dom"
import Button from "../../components/layout/atoms/Button"
import Card from "../../components/layout/atoms/Card"
import TextInput from "../../components/layout/molecules/TextInput"
import Form from "../../components/layout/molecules/Form"
import authService from "../../services/authService"
import alert from "../../components/layout/organism/Alert"
import LoginPage from "../../components/layout/template/LoginPage"

const Login = props => {
  const [loading, setLoading] = useState(false)

  const submitHandler = async data => {
    try {
      setLoading(true)
      await authService.login(data)
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
          <TextInput name="username" placeholder="Username" autoFocus />
          <TextInput name="password" type="password" placeholder="Password" />
          <Button loading={loading}>Login</Button>
        </Card>
      </Form>
    </LoginPage>
  )
}

Login.propTypes = {
  history: PropTypes.object
}

export default withRouter(Login)
