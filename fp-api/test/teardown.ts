import * as database from "../src/infra/database"

export default async function() {
  await database.close()
  console.log("Close")
}
