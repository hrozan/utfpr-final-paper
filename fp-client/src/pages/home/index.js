import React from "react"
import Card from "../../components/layout/atoms/Card"
import styles from "./styles.module.scss"

const Home = () => {
  return (
    <div className={styles.container}>
      <Card>
        <p>CPU</p>
      </Card>
      <Card>
        <p>Temp</p>
      </Card>
      <Card>
        <p>Memory</p>
      </Card>
    </div>
  )
}

export default Home
