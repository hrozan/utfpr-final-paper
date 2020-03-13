import mongoose, { HookNextFunction } from "mongoose"
import bcrypt from "bcrypt"

export interface IUser extends mongoose.Document {
  username: string
  email: string
  password: string
  checkPassword: () => boolean
}

export interface UserQuery extends mongoose.DocumentQuery<IUser, IUser> {
  n: number
}

const saltRounds = 10

const MODEL_NAME = "Users"

const User = {
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}

const userSchema = new mongoose.Schema(User)

userSchema.pre("save", async function(next: HookNextFunction) {
  const self = this as IUser
  if (!self.isModified("password")) return next()
  try {
    const salt = await bcrypt.genSalt(saltRounds)
    self.password = await bcrypt.hash(self.password, salt)
    return next()
  } catch (err) {
    return next(err)
  }
})

userSchema.methods.checkPassword = async function checkPassword(data: string) {
  return bcrypt.compare(data, this.password)
}

export default mongoose.model<IUser>(MODEL_NAME, userSchema)
