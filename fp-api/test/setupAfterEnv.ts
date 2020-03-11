import dotenv from "dotenv"
dotenv.config({ path: ".env.test" })
import * as database from "../src/infra/database"

beforeAll(async () => {
  await database.connect()
})

afterAll(async () => {
  await database.disconect()
})
