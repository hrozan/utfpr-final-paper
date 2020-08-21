import React, { useContext, useEffect } from "react"
import { Route, Redirect, RouteProps, useHistory } from "react-router-native"
import { AuthContext } from "../Auth"
import { getToken } from "../../../app/infra/provider/token"

interface Props extends RouteProps {
  component: any
}



const PrivateRoute: React.FC<Props> = ({ component: Component, ...rest }) => {
  const auth = useContext(AuthContext)
  const history = useHistory()

  const checkAlreadyLoggedIn = async () => {
    const token = await getToken()
    if (!token) {
      console.log("Not Logged")
      return
    }

    console.log("Already Logged In")
    await auth.login(token)
    history.push("/")
  }

  useEffect(() => { checkAlreadyLoggedIn() }, [])

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
