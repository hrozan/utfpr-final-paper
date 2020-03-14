import React from "react"
import styles from "./styles.module.scss"
import { Link as RouterLink } from "react-router-dom"

interface Props {
  children: React.ReactNode
  to: string
  onClick?: () => void
}

const Link = (props: Props) => {
  return <RouterLink className={styles.link} {...props} />
}

export default Link
