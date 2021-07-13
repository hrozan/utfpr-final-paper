import React from "react"
import { Container } from "native-base"
import { NativeRouter as Router, Route } from "react-router-native"

import { Login } from "./app/components/pages/Login"
import { Home } from "./app/components/pages/Home"
import PrivateRoute from "./app/components/lib/PrivateRoute"

const App: React.FC = () => {
	return (
		<Router>
			<Container>
				<PrivateRoute exact path="/" component={Home} />
				<Route path="/login" component={Login} />
			</Container>
		</Router>
	)
}

export default App
