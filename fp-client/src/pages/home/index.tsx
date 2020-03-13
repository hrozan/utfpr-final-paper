import React, { useEffect } from "react"
import { useSelector, DefaultRootState } from "react-redux"
import Card from "components/layout/atoms/Card"
import DashboardPage from "components/layout/template/CardDisplay"
import Page from "components/layout/template/Page"
import MQTTProvider from "providers/mqtt"

interface State extends DefaultRootState {
  mqtt: {
    data: {
      cpu: string
      temp: string
      memory: string
    }
  }
}

const Home = () => {
  const { data } = useSelector((state: State) => state.mqtt)

  const onConnect = () => {
    MQTTProvider.connect()
      .then(() => console.info("mqtt connected"))
      .catch(e => console.log(e))
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
