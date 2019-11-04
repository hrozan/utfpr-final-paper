import React from "react"
import styles from "./styles.module.scss"
import { Link as RouterLink } from "react-router-dom"

const Link = props => {
  return <RouterLink className={styles.link} {...props} />
}

Link.propTypes = {}

export default Link
