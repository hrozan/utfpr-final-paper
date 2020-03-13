import dotenv from "dotenv"
dotenv.config({ path: ".env.test" })
import * as database from "../src/infra/database"
import { createAdmin } from "./integration/auth"

beforeAll(async () => {
  await database.connect()
  await createAdmin()
})

afterAll(async () => {
  await database.disconect()
})
