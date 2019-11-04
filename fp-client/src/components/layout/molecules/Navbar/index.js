import React, { useState } from "react"
import * as PropTypes from "prop-types"
import styles from "./styles.module.scss"
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"

const Navbar = props => {
  const { children, show } = props
  const [isOpen, setIsOpen] = useState(false)

  const onClickHandler = () => {
    setIsOpen(!isOpen)
  }

  if (!show) {
    return null
  }

  return (
    <nav className={styles.navbar}>
      <button className={styles["menu-button"]} onClick={onClickHandler}>
        <Icon size="lg" icon={faBars} />
      </button>
      {isOpen && <div className={styles.content}>{children}</div>}
    </nav>
  )
}

Navbar.propTypes = {
  children: PropTypes.node,
  show: PropTypes.bool
}

Navbar.defaultProps = {
  show: true
}

export default Navbar
