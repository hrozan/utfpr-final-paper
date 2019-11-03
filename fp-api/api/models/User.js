const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const saltRounds = 10

const MODEL_NAME = "User"

const user = {
	username: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true }
}

const userSchema = new mongoose.Schema(user)

userSchema.pre("save", async function save(next) {
	if (!this.isModified("password")) return next()
	try {
		const salt = await bcrypt.genSalt(saltRounds)
		this.password = await bcrypt.hash(this.password, salt)
		return next()
	} catch (err) {
		return next(err)
	}
})

userSchema.methods.checkPassword = async function checkPassword(data) {
	return bcrypt.compare(data, this.password)
}

module.exports = mongoose.model(MODEL_NAME, userSchema)
