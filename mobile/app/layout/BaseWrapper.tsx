import React from "react"
import { Container, Content } from "native-base"
import { StyleSheet } from "react-native"

const BaseWrapper: React.FC = (props) => (
  <Container>
    <Content contentContainerStyle={styles.content}>{props.children}</Content>
  </Container>
)

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
})

export default BaseWrapper
