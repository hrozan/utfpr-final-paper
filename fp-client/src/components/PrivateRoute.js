import React from "react"
import * as PropTypes from "prop-types"
import { Redirect, Route } from "react-router-dom"
import { TOKEN_KEY } from "../services/authService"

const PrivateRoute = props => {
  const { children, ...rest } = props

  const token = sessionStorage.getItem(TOKEN_KEY)
  const isAuthenticated = token != null

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

PrivateRoute.propTypes = {
  children: PropTypes.node
}

export default PrivateRoute
