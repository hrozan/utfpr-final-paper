import { User } from "./model"
import * as database from "../../infra/database"

const COLLECTION_NAME = "Users"

export const insertUser = async (user: User): Promise<User> => {
  const collection = await database.getCollection(COLLECTION_NAME)

  const result = await collection.insertOne(user)
  const [newUser] = result.ops
  return newUser as User
}
