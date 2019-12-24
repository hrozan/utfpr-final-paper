const User = require("../../models/User")

const { isEmpty } = require("../../../utils")

exports.create = async (request, response) => {
	const { body } = request

	if (isEmpty(body)) return response.status(400).json({ errorMessage: "invalid body" })

	try {
		const user = await User.create(body)
		return response.status(201).json({ id: user._id })
	} catch (e) {
		console.error(`Error creating user: ${e.message}`)
		return response.status(400).json({ errorMessage: "invalid body" })
	}
}
