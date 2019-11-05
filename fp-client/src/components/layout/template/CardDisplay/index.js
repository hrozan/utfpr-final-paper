import React from "react"
import * as PropTypes from "prop-types"
import styles from "./styles.module.scss"

const CardDisplay = props => {
  const { children } = props
  return <div className={styles.container}> {children}</div>
}

CardDisplay.propTypes = {
  children: PropTypes.node
}

export default CardDisplay
