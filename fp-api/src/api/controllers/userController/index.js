const User = require("../../models/User")

const { isEmpty } = require("../../../utils")

exports.create = async (request, response) => {
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

exports.read = async (request, response) => {
  const { params } = request
  try {
    const user = await User.findById(params.id)
    const returnUser = user.toObject()
    delete returnUser.password
    return response.json({ user: returnUser })
  } catch (e) {
    console.error(`Error reading user: ${e.message}`)
    return response.status(400).json({ errorMessage: "invalid parameter" })
  }
}

exports.list = async (request, response) => {
  try {
    const users = await User.find({})
    const payload = users.map(({ _id, username, email }) => ({ id: _id, username, email }))
    return response.json(payload)
  } catch (e) {
    console.error(`Error creating user: ${e.message}`)
    return response.status(400).json({ errorMessage: "invalid body" })
  }
}

exports.delete = async (request, response) => {
  const { params } = request

  try {
    const user = await User.findByIdAndRemove(params.id)
    if (user.n <= 0) {
      return response.json({ message: "User Not Found" })
    }

    return response.json({ message: "User Deleted" })
  } catch (e) {
    console.error(`Error deleting user: ${e.message}`)
    return response.status(400).json({ errorMessage: "invalid parameter" })
  }
}
