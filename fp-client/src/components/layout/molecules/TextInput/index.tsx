import React from "react"
import classNames from "classnames"
import styles from "./styles.module.scss"
import { Field } from "react-final-form"

interface Props {
  name: string
}

const TextInput = (props: Props) => {
  const { name } = props
  const required = (value: any) => (value ? undefined : "Required")

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

TextInput.defaultProps = {
  type: "text"
}

export default TextInput
