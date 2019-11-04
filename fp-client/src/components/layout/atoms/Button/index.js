import React from "react"
import * as PropTypes from "prop-types"
import classNames from "classnames"
import styles from "./styles.module.scss"

const Button = props => {
  const { variant, children, loading, ...rest } = props
  const classes = classNames(styles.button, {
    [styles.primary]: variant === "primary",
    [styles.secondary]: variant === "secondary"
  })

  return (
    <button className={classes} {...rest}>
      {loading ? <div className={styles.loading} /> : children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(["primary", "secondary"]),
  loading: PropTypes.bool
}

Button.defaultProps = {
  variant: "primary",
  loading: false
}

export default Button
