import React from "react"
import * as PropTypes from "prop-types"
import styles from "./styles.module.scss"

const Page = props => {
  const { children } = props
  return <div className={styles.container}> {children}</div>
}

Page.propTypes = {
  children: PropTypes.node
}

export default Page
