import React from "react"
import { Item, Input } from "native-base"
import { StyleSheet } from "react-native"

interface Props {
  label: string
  value: string
  onChangeText: (text: string) => void
  password?: boolean
}

const TextField: React.FC<Props> = (props) => (
  <Item style={styles.item}>
    <Input
      placeholder={props.label}
      value={props.value}
      onChangeText={props.onChangeText}
      secureTextEntry={props.password}
    />
  </Item>
)

TextField.defaultProps = {
  password: false,
}

const styles = StyleSheet.create({
  item: {
    marginBottom: 32,
  },
})

export default TextField
