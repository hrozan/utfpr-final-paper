import React from "react"
import * as PropTypes from "prop-types"
import styles from "./styles.module.scss"

const Card = props => {
  const { children, title, ...rest } = props
  return (
    <div {...rest} className={styles.card}>
      <div className={styles.title}>{title}</div>
      <div className={styles.body}>{children}</div>
    </div>
  )
}

Card.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string
}

export default Card
