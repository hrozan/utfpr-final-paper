import React from "react"
import Card from "../../components/layout/atoms/Card"
import DashboardPage from "../../components/layout/template/CardDisplay"
import Page from "../../components/layout/template/Page"

const Home = () => {
  return (
    <Page>
      <Card title={"Monitor"}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto blanditiis consectetur dolor, explicabo
        fugit iste laborum minus nostrum obcaecati placeat provident quam quo saepe suscipit veniam! Architecto
        excepturi illum impedit?
      </Card>
      <DashboardPage>
        <Card title="CPU">
          <p>23%</p>
        </Card>
        <Card title="Temp">
          <p>23 C</p>
        </Card>
        <Card title="Memory">
          <p>23%</p>
        </Card>
      </DashboardPage>
    </Page>
  )
}

export default Home
