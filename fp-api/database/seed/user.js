require("dotenv").config()
const User = require("../../api/models/User")
const database = require("../index")
const mongoose = require("mongoose")
const debug = require("debug")("api:seed")
const users = require("./users")

async function createAdmin() {
	const promises = users.map(user => {
		const u = new User(user)
		return u.save()
	})
	const result = await Promise.all(promises)
	result.map(user => debug("user created id:", user._id))
}

async function run() {
	try {
		await database.init()
		await createAdmin()
	} catch (e) {
		console.log(e.errmsg)
	} finally {
		await mongoose.connection.close()
	}
}

run().catch()
