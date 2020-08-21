import React, { useEffect, useState } from "react"
import { Container } from "native-base"
import { NativeRouter as Router, Route, useHistory } from "react-router-native"

import Login from "./app/components/Login"
import Home from "./app/components/Home"
import PrivateRoute from "./app/components/PrivateRoute"
import { AuthProvider, login, logout } from "./app/components/Auth"
import { getToken } from "./app/infra/provider/token"


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
          <PrivateRoute exact path="/" component={Home} />
          <Route path="/login" component={Login} />
        </Container>
      </Router>
    </AuthProvider>
  )
}

export default App
