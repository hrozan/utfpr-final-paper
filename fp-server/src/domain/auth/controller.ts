import { Request, Response } from "express"
import jwt, { Secret } from "jsonwebtoken"
import User from "../user/model"

const JWT_KEY = <Secret>process.env.JWT_KEY

const LOGIN_ERROR_RESPONSE = { message: "Ops, your credential are wrong, try again." }

export async function login(request: Request, response: Response) {
  const { username, password } = request.body
  console.log(`Login attempt: ${username} `)
  try {
    const user = await User.findOne({ username })
    if (!user) {
      console.log("Model not Found", user)
      return response.status(400).json(LOGIN_ERROR_RESPONSE)
    }

    // @ts-ignore
    const match = await user.checkPassword(password)
    if (!match) {
      console.log("Wrong Password")
      return response.status(400).json(LOGIN_ERROR_RESPONSE)
    }

    const payload = {
      id: user._id,
      // @ts-ignore
      username: user.username
    }
    const token = jwt.sign(payload, JWT_KEY)

    return response.status(200).json({ token, ...payload })
  } catch (error) {
    response.status(500)
  }
}
