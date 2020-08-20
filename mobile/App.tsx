import React, { createContext, useState } from "react"
import { Container } from "native-base"
import { NativeRouter as Router, Route } from "react-router-native"

import Login from "./app/components/Login"
import Home from "./app/components/Home"
import PrivateRoute from "./app/components/PrivateRoute"
import { AuthProvider, login, logout } from "./app/components/Auth"


const App: React.FC = () => {

  const [isAuth, setIsAuth] = useState(false)

  const user = {
    isAuth,
    login: login(setIsAuth),
    logout: logout(setIsAuth)
  }

  return (
    <AuthProvider value={user}>
      <Router>
        <Container>
          <Route path="/login" component={Login} />
          <PrivateRoute exact path="/" component={Home} />
        </Container>
      </Router>
    </AuthProvider>
  )
}

export default App
