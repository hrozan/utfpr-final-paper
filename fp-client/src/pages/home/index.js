import React, { useEffect, useState } from "react"
import Card from "../../components/layout/atoms/Card"
import DashboardPage from "../../components/layout/template/CardDisplay"
import Page from "../../components/layout/template/Page"
import smartObjectService from "../../services/smartObjectService"
import MQTTProvider from "../../providers/mqtt"
import Button from "../../components/layout/atoms/Button"

const Home = () => {
  const [smartObject, setSmartObject] = useState({})
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    smartObjectService.read().then(smartObject => {
      setSmartObject(smartObject)
    })
  }, [])

  const onConnect = async () => {
    try {
      setLoading(true)
      await MQTTProvider.connect()
    } catch (e) {
      console.log(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Page>
      <Card>
        <Button loading={loading} onClick={onConnect}>
          Connect
        </Button>
      </Card>
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
