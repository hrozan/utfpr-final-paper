import mongoose, { Document, Schema } from "mongoose"
import bcrypt from "bcrypt"

const SALT_ROUNDS = 10

// region Mongoose Model
export interface User {
  _id?: any
  userName: string
  email: string
  password: string
}

type UserModel = User & Document

const schema = {
  userName: {
    required: true,
    type: String
  },
  email: {
    required: true,
    type: String
  },
  password: {
    required: true,
    type: String
  }
}

const UserSchema: Schema = new Schema(schema)
export const UserModel = mongoose.model<UserModel>("Users", UserSchema)

// endregion

export const createUser = async (user: User): Promise<User> => {
  const passwordHash = await bcrypt.hash(user.password, SALT_ROUNDS)
  return await UserModel.create({ ...user, password: passwordHash })
}

export const readAllUser = async (): Promise<User[]> => {
  return UserModel.find({})
}

export const findUserByEmail = async (email: string): Promise<User | null> => {
  return UserModel.findOne({ email })
}

export const checkUserForLogin = async (email: string, password: string): Promise<boolean> => {
  const user = await findUserByEmail(email)
  if (!user) {
    return false
  }
  return bcrypt.compare(password, user.password)
}
