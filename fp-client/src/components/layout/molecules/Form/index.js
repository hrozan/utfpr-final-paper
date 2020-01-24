import React from "react"
import * as PropTypes from "prop-types"
import styles from "./styles.module.scss"
import { Form as FinalForm } from "react-final-form"

const Form = props => {
  const { children, onSubmit } = props
  return (
    <FinalForm onSubmit={onSubmit}>
      {props => (
        <form className={styles.form} onSubmit={props.handleSubmit}>
          {children}
        </form>
      )}
    </FinalForm>
  )
}

Form.propTypes = {
  children: PropTypes.node,
  onSubmit: PropTypes.func.isRequired
}

export default Form
