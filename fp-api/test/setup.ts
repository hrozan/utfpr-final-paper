import { config } from "dotenv"
config({ path: ".env.test" })
import * as database from "../src/infra/database"

export default async function() {
  await database.connect()
}
