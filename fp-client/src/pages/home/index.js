import React, { useEffect, useState } from "react"
import Card from "../../components/layout/atoms/Card"
import DashboardPage from "../../components/layout/template/CardDisplay"
import Page from "../../components/layout/template/Page"
import smartObjectService from "../../services/smartObjectService"
import MQTTProvider from "../../providers/mqtt"

const Home = () => {
  const [smartObject, setSmartObject] = useState({})
  useEffect(() => {
    smartObjectService.read().then(smartObject => {
      setSmartObject(smartObject)
    })

    // init mqtt
    MQTTProvider.init()
  }, [])
  return (
    <Page>
      <Card title={"Monitor"}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto blanditiis consectetur dolor, explicabo
        fugit iste laborum minus nostrum obcaecati placeat provident quam quo saepe suscipit veniam! Architecto
        excepturi illum impedit?
      </Card>
      <DashboardPage>
        <Card title="CPU">
          <p>{smartObject.cpu}%</p>
        </Card>
        <Card title="Temp">
          <p>{smartObject.temp} C</p>
        </Card>
        <Card title="Memory">
          <p>{smartObject.memory}%</p>
        </Card>
      </DashboardPage>
    </Page>
  )
}

export default Home
