const mongoose = require("mongoose")
const debug = require("debug")("api:database")
const { DB_NAME } = process.env

exports.init = async function() {
	try {
		mongoose.set("useNewUrlParser", true)
		mongoose.set("useFindAndModify", false)
		mongoose.set("useUnifiedTopology", true)
		mongoose.set("useCreateIndex", true)
		await mongoose.connect(`mongodb://localhost/${DB_NAME}`)
		debug("connected")
	} catch (error) {
		debug(error.message)
		console.error.bind(console, "connection error:")
	}
}
