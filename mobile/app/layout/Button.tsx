import React from "react"
import { Button as NBButton, Text } from "native-base"

interface Props {
  title: string
  onPress: () => void
  testID?: string
}

const Button: React.FC<Props> = (props) => (
  <NBButton testID={props.testID} onPress={props.onPress} full>
    <Text>{props.title}</Text>
  </NBButton>
)
export default Button
