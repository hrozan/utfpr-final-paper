require("dotenv").config()
const User = require("../../api/models/User")
const database = require("../index")
const mongoose = require("mongoose")
const debug = require("debug")("api:seed")
const users = require("./users")

async function createAdmin() {
	const promises = users.map(user => new User(user).save())
	const result = await Promise.all(promises)
	result.map(user => debug("user created id:", user._id))
}

async function run() {
	try {
		await database.init()
		await createAdmin()
	} catch (e) {
		console.error(e.errmsg)
	} finally {
		await mongoose.connection.close()
	}
}

run().catch()
