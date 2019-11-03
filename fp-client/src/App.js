import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import Home from "./pages/Home"
import Login from "./pages/login"
import PrivateRoute from "./components/PrivateRoute"

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <PrivateRoute exact path={"/"}>
            <Home />
          </PrivateRoute>
          <Route path={"/login"}>
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
