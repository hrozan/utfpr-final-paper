import React from "react"
import { Redirect, Route } from "react-router-dom"
import { useSelector, DefaultRootState } from "react-redux"

interface Props {
  children: React.ReactNode
  exact: boolean
  path: string
}

interface State extends DefaultRootState {
  auth: {
    isAuthenticated: boolean
  }
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
