import { Server } from "http"
import { MongoClient } from "mongodb"

export interface App {
  server: Server
  database: MongoClient
}
