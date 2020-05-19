export interface User {
  _id?: any
  userName: string
  email: string
  password: string
}

export interface AuthCredential {
  email: string
  password: string
}

export interface TokenPayload {
  _id: string
}
