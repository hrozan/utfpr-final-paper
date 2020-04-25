import { Server } from "http"
import { Request, Response } from "express"
import { MongoClient } from "mongodb"

export interface App {
  server: Server
  database: MongoClient
}

export interface Context {
  req: Request
  res: Response
}
