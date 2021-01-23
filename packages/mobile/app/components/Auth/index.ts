import { createContext } from "react"
import { saveToken, clearToken } from "../../../app/infra/provider/token"

const user = {
    isAuth: false,
    login: async (token: string) => { },
    logout: async () => { }
}

export const AuthContext = createContext(user)
export const AuthProvider = AuthContext.Provider
export const AuthConsumer = AuthContext.Consumer

export const login = (updateState: Function) => async (token: string) => {
    await saveToken(token)
    updateState(true)
    console.log("Login Successfully")
} 

export const logout = (updateState: Function) => async () => {
    await clearToken()
    updateState(false)
    console.log("Logout Successfully")
}