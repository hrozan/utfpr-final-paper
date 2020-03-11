// TODO: refact this modulo to user a useri interface
// see:"://stackoverflow.com/questions/34482136/mongoose-the-typescript-way
import mongoose, { HookNextFunction } from "mongoose"
import bcrypt from "bcrypt"

const saltRounds = 10

const MODEL_NAME = "Users"

const User = {
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}

const userSchema = new mongoose.Schema(User)

userSchema.pre("save", async function save(next: HookNextFunction) {
  if (!this.isModified("password")) return next()
  try {
    const salt = await bcrypt.genSalt(saltRounds)
    // @ts-ignore
    this.password = await bcrypt.hash(this.password, salt)
    return next()
  } catch (err) {
    return next(err)
  }
})

userSchema.methods.checkPassword = async function checkPassword(data: string) {
  return bcrypt.compare(data, this.password)
}

export default mongoose.model(MODEL_NAME, userSchema)
