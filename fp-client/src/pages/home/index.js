import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import Card from "../../components/layout/atoms/Card"
import DashboardPage from "../../components/layout/template/CardDisplay"
import Page from "../../components/layout/template/Page"
import MQTTProvider from "../../providers/mqtt"

const Home = () => {
  const { data } = useSelector(state => state.mqtt)

  const onConnect = async () => {
    try {
      await MQTTProvider.connect()
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => onConnect(), [])

  return (
    <Page>
      <DashboardPage>
        <Card title="CPU">
          <p>{data.cpu}%</p>
        </Card>
        <Card title="Memory">
          <p>{data.memory}%</p>
        </Card>
        <Card title="Temp">
          <p>{data.temp} C</p>
        </Card>
      </DashboardPage>
    </Page>
  )
}

export default Home
