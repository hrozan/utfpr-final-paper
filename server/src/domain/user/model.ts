import mongoose, { Document, Schema } from "mongoose"
import bcrypt from "bcrypt"
import { User } from "./types"

const SALT_ROUNDS = 10

// region Mongoose Model

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
export type UserModel = User & Document
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

export const deleteUser = async (id: string): Promise<User | null> => {
  return UserModel.findByIdAndDelete(id)
}

export const checkUserPassword = async (password: string, hash: string): Promise<boolean> =>
  bcrypt.compare(password, hash)
