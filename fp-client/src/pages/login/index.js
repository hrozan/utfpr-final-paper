import React, { useState } from "react"
import * as PropTypes from "prop-types"
import { withRouter } from "react-router-dom"
import Button from "../../components/layout/atoms/Button"
import Card from "../../components/layout/atoms/Card"
import TextInput from "../../components/layout/molecules/TextInput"
import styles from "./styles.module.scss"
import Form from "../../components/layout/molecules/Form"
import authService from "../../components/auth/authService"

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
      } else {
        const { message } = error.response.data
        alert(message)
      }
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <Form onSubmit={submitHandler}>
        <Card>
          <h1>Welcome {"👨‍🚀️"}</h1>
          <TextInput name="username" placeholder="Username" autoFocus />
          <TextInput name="password" type="password" placeholder="Password" />
          <Button loading={loading}>Login</Button>
        </Card>
      </Form>
    </div>
  )
}

Login.propTypes = {
  history: PropTypes.object
}

export default withRouter(Login)
