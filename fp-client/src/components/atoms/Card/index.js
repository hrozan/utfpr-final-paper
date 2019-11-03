import React from "react"
import * as PropTypes from "prop-types"
import styles from "./styles.module.scss"

const Card = props => <div className={styles.card}>{props.children}</div>

Card.propTypes = {
  children: PropTypes.node
}

export default Card
