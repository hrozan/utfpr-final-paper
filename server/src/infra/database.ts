import { Db, MongoClient } from "mongodb"
import { DATABASE_NAME, DATABASE_URI } from "./config"

export default class Database {
  static instance: Database
  client: MongoClient
  db: Db

  constructor(client: MongoClient) {
    this.client = client
    this.db = this.client.db(DATABASE_NAME)
  }

  static async connect(): Promise<Database> {
    if (!this.instance) {
      const config = { useUnifiedTopology: true }
      const client = await MongoClient.connect(DATABASE_URI, config)
      this.instance = new Database(client)
    }
    return this.instance
  }

  close = (): Promise<void> => {
    return this.client.close()
  }

  insert = (collectionName: string) => async <T>(data: T) => {
    const collection = await this.db.collection(collectionName)
    const result = await collection.insertOne(data)
    const [newDocument] = result.ops
    return newDocument as T
  }

  findAll = async <T>(collectionName: string): Promise<T[]> => {
    const collection = await this.db.collection(collectionName)
    return collection.find<T>({}).toArray()
  }
}
