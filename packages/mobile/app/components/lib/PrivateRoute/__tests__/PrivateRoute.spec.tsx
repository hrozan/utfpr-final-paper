import React from "react"
import TestRenderer from "react-test-renderer"
import { View } from "react-native"
import { PrivateRoute } from "../PrivateRoute"

function TestComponent(): JSX.Element {
	return <View>Test</View>
}

describe("PrivateRoute", () => {
	it("should return null for unauthenticated", () => {
		const render = TestRenderer.create(<PrivateRoute exact path={"/example"} component={TestComponent} />)
	})
})
