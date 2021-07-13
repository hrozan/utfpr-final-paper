import React from "react"
import { Item, Input } from "native-base"
import { StyleSheet } from "react-native"

type Props = React.PropsWithChildren<{
	label: string
	value: string
	onChangeText: (text: string) => void
	password?: boolean
	testID?: string
}>

export function TextField(props: Props): JSX.Element {
	return (
		<Item style={styles.item}>
			<Input
				testID={props.testID}
				placeholder={props.label}
				value={props.value}
				onChangeText={props.onChangeText}
				secureTextEntry={props.password}
			/>
		</Item>
	)
}

TextField.defaultProps = {
	password: false,
}

const styles = StyleSheet.create({
	item: {
		marginBottom: 32,
	},
})
