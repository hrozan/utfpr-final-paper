import { IUser } from "./types"
import { getCollection } from "../../infra/database"

const COLLECTION_NAME = "Users"

export const create = async (user: IUser): Promise<IUser> => {
  const collection = await getCollection(COLLECTION_NAME)
  const result = await collection.insertOne(user)
  return result.ops[0] as IUser
}
