import { Request, Response } from "express"
import User from "./model"
import { isEmpty } from "../../utils"

export async function create(request: Request, response: Response) {
  const { body } = request

  if (isEmpty(body)) {
    return response.status(400).json({ errorMessage: "invalid body" })
  }

  try {
    const user = await User.create(body)
    return response.status(201).json({ id: user._id })
  } catch (e) {
    console.error(`Error creating user: ${e.message}`)
    return response.status(400).json({ errorMessage: "invalid body" })
  }
}

export async function read(request: Request, response: Response) {
  const { params } = request
  try {
    const user = await User.findById(params.id)
    // @ts-ignore
    const returnUser = user.toObject()
    delete returnUser.password
    return response.json({ user: returnUser })
  } catch (e) {
    console.error(`Error reading user: ${e.message}`)
    return response.status(400).json({ errorMessage: "invalid parameter" })
  }
}

export async function list(request: Request, response: Response) {
  try {
    const users = await User.find({})
    // @ts-ignore
    const payload = users.map(({ _id, username, email }) => ({ id: _id, username, email }))
    return response.json(payload)
  } catch (e) {
    console.error(`Error creating user: ${e.message}`)
    return response.status(400).json({ errorMessage: "invalid body" })
  }
}

export async function remove(request: Request, response: Response) {
  const { params } = request

  try {
    const user = await User.findByIdAndRemove(params.id)
    // @ts-ignore
    if (user.n <= 0) {
      return response.json({ message: "Model Not Found" })
    }

    return response.json({ message: "Model Deleted" })
  } catch (e) {
    console.error(`Error deleting user: ${e.message}`)
    return response.status(400).json({ errorMessage: "invalid parameter" })
  }
}
