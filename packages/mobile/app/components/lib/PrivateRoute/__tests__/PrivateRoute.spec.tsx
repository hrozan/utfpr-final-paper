import React from "react"
import TestRenderer from "react-test-renderer"

import { PrivateRoute } from "../PrivateRoute"
import { View } from "react-native"

function TestComponent(): JSX.Element {
	return <View>Test</View>
}

describe("PrivateRoute", () => {
	xit("should return null for unauthenticated", () => {
		const render = TestRenderer.create(<PrivateRoute exact path={"/example"} component={TestComponent} />)
	})
})
