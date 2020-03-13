import React from "react"
import classNames from "classnames"
import styles from "./styles.module.scss"

interface Props {
  children: React.ReactNode
  variant?: string
  loading?: boolean
}

const Button = (props: Props) => {
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

Button.defaultProps = {
  variant: "primary",
  loading: false
}

export default Button
