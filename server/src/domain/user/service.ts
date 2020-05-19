import * as jwt from "jsonwebtoken"
import * as model from "./model"
import { AuthCredential, TokenPayload } from "./types"
import { JWT_KEY } from "../../infra/config"

export const login = async (credential: AuthCredential): Promise<string | boolean> => {
  const user = await model.findUserByEmail(credential.email)

  if (!user) {
    return false
  }

  const match = await model.checkUserPassword(credential.password, user.password)
  if (!match) {
    return false
  }

  const payload: TokenPayload = { _id: user._id }
  return jwt.sign(payload, JWT_KEY)
}
