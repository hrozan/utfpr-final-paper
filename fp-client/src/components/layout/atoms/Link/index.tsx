import React from "react"
import styles from "./styles.module.scss"
import { Link as RouterLink } from "react-router-dom"

interface Props {
  to: string
}

const Link = (props: Props) => {
  return <RouterLink className={styles.link} {...props} />
}

export default Link
