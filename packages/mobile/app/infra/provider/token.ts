import AsyncStorage from '@react-native-community/async-storage'

const TOKEN_KEY = 'auth_token'

export const saveToken = async (value: string) => AsyncStorage.setItem(TOKEN_KEY, value)
export const getToken = async () => AsyncStorage.getItem(TOKEN_KEY)
export const clearToken = async () => AsyncStorage.removeItem(TOKEN_KEY)
