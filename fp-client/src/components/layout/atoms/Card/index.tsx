import React from "react"
import styles from "./styles.module.scss"

interface Props {
  children: React.ReactNode
  title?: string
}

const Card = (props: Props) => {
  const { children, title, ...rest } = props
  return (
    <div {...rest} className={styles.card}>
      <p className={styles.title}>{title}</p>
      <div className={styles.body}>{children}</div>
    </div>
  )
}

export default Card
