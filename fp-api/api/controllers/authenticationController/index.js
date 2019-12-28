const User = require("../../models/User")
const jwt = require("jsonwebtoken")
const { JWT_KEY } = process.env

const LOGIN_ERROR_RESPONSE = { message: "Ops, your credential are wrong, try again." }

exports.login = async (request, response) => {
	const { username, password } = request.body
	console.log(`Login attempt: ${username} `)
	try {
		const user = await User.findOne({ username })
		if (!user) {
			console.log("User not Found")
			return response.status(400).json(LOGIN_ERROR_RESPONSE)
		}

		const match = await user.checkPassword(password)
		if (!match) {
			console.log("Wrong Password")
			return response.status(400).json(LOGIN_ERROR_RESPONSE)
		}

		const payload = {
			id: user._id,
			username: user.username
		}
		const token = jwt.sign(payload, JWT_KEY)

		return response.status(200).json({ token, ...payload })
	} catch (error) {
		response.status(500)
	}
}
