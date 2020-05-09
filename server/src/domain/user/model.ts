import { IsString, IsEmail, validateOrReject } from "class-validator"
import Database from "../../infra/database"

const collectionName = "Users"

export class User {
  _id: string

  @IsEmail()
  email: string

  @IsString()
  password: string

  @IsString()
  userName: string

  constructor({ _id, email, password, userName }: any) {
    this._id = _id
    this.email = email
    this.password = password // todo hash password
    this.userName = userName
  }
}

export class UserModel {
  static findAll = async (): Promise<User[]> => {
    const db = await Database.connect()
    return db.findAll<User>(collectionName)
  }

  static save = async (user: User): Promise<User> => {
    const db = await Database.connect()
    await validateOrReject(user)
    return db.insert(collectionName)<User>(user)
  }
}
