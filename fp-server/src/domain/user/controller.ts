import { insertUser } from "./repository"
import { validateUser } from "./model"
import { Context } from "../../infra/types"

export const createUser = async (ctx: Context) => {
  const data = ctx.req.body
  const errors = validateUser(data)

  if (errors) {
    return ctx.res.status(400).json(errors)
  }

  const user = await insertUser(data)
  return ctx.res.status(201).json({ id: user })
}
