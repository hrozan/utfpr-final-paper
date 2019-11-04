/* eslint-disable react/prop-types */
import React from "react"
import * as PropTypes from "prop-types"
import classNames from "classnames"
import styles from "./styles.module.scss"
import { Field } from "react-final-form"

const TextInput = props => {
  const { name } = props
  const required = value => (value ? undefined : "Required")

  return (
    <Field name={name} validate={required}>
      {({ input, meta }) => {
        const error = meta.touched && meta.error
        const classes = classNames(styles.input, { [styles["input-error"]]: error })
        return (
          <div className={styles.container}>
            <input {...input} id={`text-input-${name}`} className={classes} {...props} />
            {error && <span className={styles.error}>{meta.error}</span>}
          </div>
        )
      }}
    </Field>
  )
}

TextInput.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string.isRequired,
  required: PropTypes.string
}

TextInput.defaultProps = {
  type: "text"
}

export default TextInput
