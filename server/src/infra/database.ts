import { Collection, Db, MongoClient } from "mongodb"
import { DATABASE_URI, DATABASE_NAME } from "./config"

let database: Db
let client: MongoClient

export const connect = async (): Promise<MongoClient> => {
  const config = { useUnifiedTopology: true }
  client = await MongoClient.connect(DATABASE_URI, config)
  database = client.db(DATABASE_NAME)
  return client
}

export const getDb = async (): Promise<Db> => {
  if (!database) {
    await connect()
  }
  return database
}

export const getCollection = async (collectionName: string): Promise<Collection> => {
  const db = await getDb()
  return db.collection(collectionName)
}

export const close = () => {
  if (!client) {
    return
  }
  return client.close()
}
