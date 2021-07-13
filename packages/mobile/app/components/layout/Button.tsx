import React from "react"
import { Button as NBButton, Text } from "native-base"

type Props = {
  title: string
  onPress: () => void
  testID?: string
}

export function Button(props: Props): JSX.Element {
	return (
		<NBButton testID={props.testID} onPress={props.onPress} full>
			<Text>{props.title}</Text>
		</NBButton>
	)
}
