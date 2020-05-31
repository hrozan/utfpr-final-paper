import AsyncStorage from "@react-native-community/async-storage"

export default {
  async setItem(key: string, value: string) {
    return AsyncStorage.setItem(key, value)
  },
}
