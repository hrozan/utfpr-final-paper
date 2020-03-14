import React from "react"
import styles from "./styles.module.scss"
import { Form as FinalForm } from "react-final-form"

interface Props {
  children: React.ReactNode
  onSubmit(e: any): void | Promise<void>
}

const Form = (props: Props) => {
  const { children, onSubmit } = props
  return (
    <FinalForm onSubmit={onSubmit}>
      {(props) => (
        <form className={styles.form} onSubmit={props.handleSubmit}>
          {children}
        </form>
      )}
    </FinalForm>
  )
}

export default Form
