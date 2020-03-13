import React, { ReactNode } from "react"
import { View, StyleSheet } from "react-native"

type Props = {
  children: ReactNode
}

export default (props: Props) => {
  return <View style={styles.container}>{props.children}</View>
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor:"red"
  },
})
