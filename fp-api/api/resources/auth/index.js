const User = require("../../models/User")
const jwt = require("jsonwebtoken")
const { JWT_KEY } = process.env

const LOGIN_ERROR_RESPONSE = { message: "Ops, your credential are wrong, try again." }

const authController = {
	async login(req, res) {
		const { username, password } = req.body

		try {
			const user = await User.findOne({ username })
			if (!user) {
				console.log("User not Found")
				return res.status(400).json(LOGIN_ERROR_RESPONSE)
			}

			const match = await user.checkPassword(password)
			if (!match) {
				console.log("Wrong Password")
				return res.status(400).json(LOGIN_ERROR_RESPONSE)
			}

			const payload = {
				id: user._id,
				username: user.username
			}
			const token = jwt.sign(payload, JWT_KEY)

			res.status(200).json({ token, ...payload })
		} catch (error) {
			res.status(500)
		}
	}
}

module.exports = authController
