import User from "../src/domain/user/model"

const user = {
  email: "admin@email.com.br",
  username: "admin",
  password: "password"
}

async function run() {
  console.info("Start Seed")
  try {
    const result = await User.create(user)
    console.log("User Created")
    console.log(result)
  } catch (e) {
    console.error(e.message)
  }
}

run().then()
