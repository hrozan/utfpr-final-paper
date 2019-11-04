import React from "react"
import styles from "./styles.module.scss"
import { useSelector } from "react-redux"
import Card from "../../atoms/Card"

const AlertModal = () => {
  const alert = useSelector(state => state.alert)
  const { message } = alert

  if (!message) {
    return null
  }

  return (
    <div className={styles.alert}>
      <div className={styles["card-container"]}>
        <Card>
          <p className={styles.message}>{message}</p>
        </Card>
      </div>
    </div>
  )
}

AlertModal.propTypes = {}

export default AlertModal
