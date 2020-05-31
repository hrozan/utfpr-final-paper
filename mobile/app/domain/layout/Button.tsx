import React from "react"
import { Button as RNButton } from "react-native"

interface Props {
  title: string
  onPress: () => void
  testID?: string
}

const Button: React.FC<Props> = (props) => (
  <RNButton testID={props.testID} title={props.title} onPress={props.onPress} />
)
export default Button
