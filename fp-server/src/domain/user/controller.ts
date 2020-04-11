import * as model from "./model"

export const createUser = async (data: any) => {
  const user = await model.create(data)
  return user._id
}
