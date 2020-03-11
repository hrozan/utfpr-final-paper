import { connect, disconect } from "../src/infra/database"
import User from "../src/domain/user/model"

const newUser = {
  email: "admin@email.com.br",
  username: "admin",
  password: "password"
}

async function run() {
  console.info("Start Seed")
  try {
    await connect()
    const user = await User.create(newUser)
    console.log("User Created")
    console.log(user)
  } catch (e) {
    console.error(e.message)
  } finally {
    await disconect()
  }
}

run().then()
