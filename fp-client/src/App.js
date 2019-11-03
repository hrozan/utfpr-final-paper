import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome"
import { faHome, faSignOutAlt } from "@fortawesome/free-solid-svg-icons"

import Home from "./pages/home"
import Login from "./pages/login"
import PrivateRoute from "./components/PrivateRoute"
import Navbar from "./components/molecules/Navbar"
import Link from "./components/atoms/Link"

function App() {
  return (
    <Router>
      <div>
        <Navbar>
          <Link to={"/login"}>
            <Icon icon={faSignOutAlt} size={"lg"} />
          </Link>
          <Link to={"/"}>
            <Icon icon={faHome} size={"lg"} />
          </Link>
        </Navbar>
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
