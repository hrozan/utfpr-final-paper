import React from "react"
import * as PropTypes from "prop-types"
import { Redirect, Route } from "react-router-dom"
import { useSelector } from "react-redux"

const PrivateRoute = props => {
  const { children, ...rest } = props

  const auth = useSelector(state => state.auth)
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

PrivateRoute.propTypes = {
  children: PropTypes.node
}

export default PrivateRoute
