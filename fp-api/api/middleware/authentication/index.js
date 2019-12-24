const jwt = require("jsonwebtoken")
const { JWT_KEY } = process.env

const index = {
	async middleware(req, res, next) {
		const token = req.headers.authorization
		if (!token) {
			return res.status(403).json({})
		}

		jwt.verify(token, JWT_KEY, function(err, user) {
			req.user = user
			next()
		})
	}
}
module.exports = index
