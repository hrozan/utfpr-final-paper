import Database from "../../infra/database"

const collectionName = "Users"

export interface User {
  _id?: string
  userName: string
  email: string
  password: string
}

export const findAllUser = async (): Promise<User[]> => {
  const db = await Database.connect()
  return db.findAll<User>(collectionName)
}

export const saveUser = async (user: User): Promise<User> => {
  const db = await Database.connect()
  return db.insert(collectionName)<User>(user)
}
