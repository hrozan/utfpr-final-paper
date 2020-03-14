import React from "react"
import styles from "./styles.module.scss"

interface Props {
  children: React.ReactNode
}

const LoginPage = (props: Props) => {
  const { children } = props
  return <div className={styles.container}> {children}</div>
}

export default LoginPage
