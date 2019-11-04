import React from "react"
import Link from "./layout/atoms/Link"
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome"
import { faHome, faSignOutAlt } from "@fortawesome/free-solid-svg-icons"
import Navbar from "./layout/molecules/Navbar"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "./auth/authActions"

const Menu = () => {
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const { isAuthenticated } = auth

  const onLogout = () => {
    dispatch(logout())
  }

  return (
    <Navbar show={isAuthenticated}>
      <Link onClick={onLogout}>
        <Icon to={"/login"} icon={faSignOutAlt} size={"lg"} />
      </Link>
      <Link to={"/"}>
        <Icon icon={faHome} size={"lg"} />
      </Link>
    </Navbar>
  )
}

Menu.propTypes = {}

export default Menu
