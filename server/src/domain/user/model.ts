import Database from "../../infra/database"

const collectionName = "Users"

export interface User {
  _id?: string
  userName: string
  email: string
  password: string
}

export class UserModel {
  user: User
  db: Database
  constructor(db: Database, data?: any) {
    this.user = <User>data
    this.db = db
  }
  save = async () => this.db.insert(collectionName)<User>(this.user)
  findAll = async () => this.db.find<User>(collectionName)
}
