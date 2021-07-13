import React from "react"
import { Card as NativeCard, CardItem, Body } from "native-base"

export function Card(props: React.PropsWithChildren<unknown>): JSX.Element {
	return (
		<NativeCard transparent>
			<CardItem>
				<Body>{props.children}</Body>
			</CardItem>
		</NativeCard>
	)
}
