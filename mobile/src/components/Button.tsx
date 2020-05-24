import React from "react"
import { Button as NativeButton, Text } from "native-base"

interface Props {
  title: string
  onPress: () => void
}

const Button: React.FC<Props> = (props) => (
  <NativeButton full onPress={props.onPress}>
    <Text>{props.title}</Text>
  </NativeButton>
)

export default Button
