import React from "react"
import * as PropTypes from "prop-types"
import styles from "./styles.module.scss"

const LoginPage = props => {
  const { children } = props
  return <div className={styles.container}> {children}</div>
}

LoginPage.propTypes = {
  children: PropTypes.node
}

export default LoginPage
