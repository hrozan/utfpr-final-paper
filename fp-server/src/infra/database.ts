import { Collection, Db, MongoClient } from "mongodb"
import { DATABASE_URI, DATABASE_NAME } from "./config"

let client: MongoClient

export const connect = async (): Promise<MongoClient> => {
  const config = { useUnifiedTopology: true }
  client = new MongoClient(DATABASE_URI, config)
  return client.connect()
}

export const getDb = async (): Promise<Db> => {
  if (!client) {
    client = await connect()
  }
  return client.db(DATABASE_NAME)
}

export const getCollection = async (collectionName: string) : Promise<Collection> => {
  const db = await getDb()
  return db.collection(collectionName)
}

export const close = () => {
  if (!client) {
    return
  }
  return client.close()
}
