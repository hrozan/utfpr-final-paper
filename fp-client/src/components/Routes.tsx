import React from "react"
import PrivateRoute from "./auth/PrivateRoute"
import Home from "../pages/home"
import Login from "../pages/login"
import { Route, Switch } from "react-router-dom"

const Routes = () => {
  return (
    <Switch>
      <PrivateRoute exact path={"/"}>
        <Home />
      </PrivateRoute>
      <Route path={"/login"}>
        <Login />
      </Route>
    </Switch>
  )
}

export default Routes
