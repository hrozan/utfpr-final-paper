/* eslint-disable react/prop-types */
import React from "react"
import * as PropTypes from "prop-types"
import styles from "./styles.module.scss"
import { Field } from "react-final-form"

const TextInput = props => {
  const TextInputProps = props
  const { name } = props
  return (
    <Field name={name}>
      {props => (
        <div>
          <input {...props.input} id={`text-input-${name}`} className={styles.input} {...TextInputProps} />
        </div>
      )}
    </Field>
  )
}

TextInput.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string.isRequired
}

TextInput.defaultProps = {
  type: "text"
}

export default TextInput
