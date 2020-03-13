import mongoose, { Mongoose } from "mongoose"
const MONGO_URL = <string>process.env.MONGO_URL

mongoose.set("useNewUrlParser", true)
mongoose.set("useFindAndModify", false)
mongoose.set("useUnifiedTopology", true)
mongoose.set("useCreateIndex", true)

export async function connect(): Promise<Mongoose | null> {
  try {
    const client: Mongoose = await mongoose.connect(MONGO_URL)
    console.log("Database Connected Succefully")
    return client
  } catch (error) {
    console.error(error.message)
    return null
  }
}

export async function disconect(): Promise<void> {
  return mongoose.disconnect()
}
