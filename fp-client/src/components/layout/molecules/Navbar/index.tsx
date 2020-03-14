import React, { useState } from "react"
import styles from "./styles.module.scss"
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome"
import { faBars, faLaughWink, faSadTear } from "@fortawesome/free-solid-svg-icons"
import { useSelector } from "react-redux"

interface Props {
  children: React.ReactNode
  show: boolean
}

const Navbar = (props: Props) => {
  const { children, show } = props
  const [isOpen, setIsOpen] = useState(false)
  // @ts-ignore
  const mqtt = useSelector((state) => state.mqtt)

  const onClickHandler = () => {
    setIsOpen(!isOpen)
  }

  if (!show) {
    return null
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles["content-menu"]}>
        <button className={styles["menu-button"]} onClick={onClickHandler}>
          <Icon size="lg" icon={faBars} />
        </button>
        <Icon className={styles["connected-icon"]} icon={mqtt.connected ? faLaughWink : faSadTear} />
      </div>
      {isOpen && <div className={styles.content}>{children}</div>}
    </nav>
  )
}

Navbar.defaultProps = {
  show: true
}

export default Navbar
