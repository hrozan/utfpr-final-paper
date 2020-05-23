import React from "react"
import { Button, Container, Content, Footer, FooterTab, Header, Text } from "native-base"

const App: React.FC = () => {
  const sayHello = () => {
    console.log("Hello")
  }

  return (
    <Container>
      <Header />
      <Content>
        <Text>Higor Rozan</Text>
      </Content>
      <Footer>
        <FooterTab>
          <Button onPress={sayHello}>
            <Text>Click Me!</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  )
}

export default App
