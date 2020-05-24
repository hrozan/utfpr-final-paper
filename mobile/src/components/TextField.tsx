import React from "react"
import { Item, Input } from "native-base"
import { StyleSheet } from "react-native"

interface Props {
  label: string
}

const TextField: React.FC<Props> = (props) => (
  <Item style={styles.item}>
    <Input placeholder={props.label} />
  </Item>
)

const styles = StyleSheet.create({
  item: {
    marginBottom: 32,
  },
})

export default TextField
