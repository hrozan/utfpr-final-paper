import React from "react"
import { Redirect, Route } from "react-router-dom"
import { useSelector } from "react-redux"
import { AuthState } from "./ducks"

interface Props {
  children: React.ReactNode
  exact: boolean
  path: string
}

interface State {
  auth: AuthState
}

const PrivateRoute = (props: Props) => {
  const { children, ...rest } = props

  const auth = useSelector((state: State) => state.auth)
  const { isAuthenticated } = auth

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  )
}

export default PrivateRoute
