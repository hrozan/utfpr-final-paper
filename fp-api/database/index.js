const mongoose = require("mongoose")
const debug = require("debug")("api:database")
const { DB_NAME } = process.env

exports.init = async function() {
	try {
		await mongoose.connect(`mongodb://localhost/${DB_NAME}`, { useNewUrlParser: true, useUnifiedTopology: true })
		debug("connected")
	} catch (error) {
		debug(error.message)
		console.error.bind(console, "connection error:")
	}
}
