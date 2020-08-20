import React, { useContext } from "react"
import { Route, Redirect, RouteProps } from "react-router-native"
import { AuthContext } from "../Auth"

interface Props extends RouteProps {
  component: any
}


const PrivateRoute: React.FC<Props> = ({ component: Component, ...rest }) => {
  const auth = useContext(AuthContext)

  return (
    <Route
      {...rest}
      render={(props) =>
        auth.isAuth ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          )
      }
    />
  )
}
export default PrivateRoute
