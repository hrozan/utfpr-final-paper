import AsyncStorage from "@react-native-community/async-storage"

export const saveItemOnStorage = (key: string, value: string) => AsyncStorage.setItem(key, value)
