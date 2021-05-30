import { createContext } from 'react'
import { saveToken, clearToken } from '../../infra/provider/token'

const user = {
	isAuth: false,
	login: async (token: string) => {
		console.log(token)
	},
	logout: async () => {
		console.log('logout')
	},
}

export const AuthContext = createContext(user)
export const AuthProvider = AuthContext.Provider
export const AuthConsumer = AuthContext.Consumer

type UpdateFunction = (state: boolean) => void

export const login = (updateState: UpdateFunction) => async (token: string) => {
	await saveToken(token)
	updateState(true)
	console.log('Login Successfully')
}

export const logout = (updateState: UpdateFunction) => async () => {
	await clearToken()
	updateState(false)
	console.log('Logout Successfully')
}
