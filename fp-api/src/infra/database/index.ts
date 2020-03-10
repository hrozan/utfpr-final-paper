import mongoose from "mongoose"
const MONGO_URL = <string>process.env.MONGO_URL

console.log(MONGO_URL)

mongoose.set("useNewUrlParser", true)
mongoose.set("useFindAndModify", false)
mongoose.set("useUnifiedTopology", true)
mongoose.set("useCreateIndex", true)

export async function connect() {
  try {
    await mongoose.connect(MONGO_URL)
    console.log("Database Connected Succefully")
  } catch (error) {
    console.error(error.message)
  }
}

export async function close() {
  return mongoose.disconnect()
}
