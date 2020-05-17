import mongoose, { Document, Schema } from "mongoose"

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
const UserModel = mongoose.model<UserModel>("Users", UserSchema)

// endregion

export const createUser = async (user: User): Promise<User> => {
  return await UserModel.create(user)
}

export const readAllUser = async (): Promise<User[]> => {
  return UserModel.find({})
}
