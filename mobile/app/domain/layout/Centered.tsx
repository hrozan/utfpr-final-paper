import React from "react"
import { Col, Grid } from "native-base"
import { StyleSheet } from "react-native"

const Centered: React.FC = (props) => (
  <Grid style={styles.content}>
    <Col>{props.children}</Col>
  </Grid>
)

const styles = StyleSheet.create({
  content: { alignItems: "center" },
})

export default Centered
