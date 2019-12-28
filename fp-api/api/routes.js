const express = require("express")
const api = express.Router()
const authenticationController = require("./controllers/authenticationController")
const smartObject = require("./controllers/smartObjectController")
const userController = require("./controllers/userController")
const authentication = require("./middleware/authentication")

api.route("/").get((req, res) => res.json({ status: "ok" }))
api.route("/login").post(authenticationController.login)
api.route("/mqtt/credentials").get(authentication.middleware, smartObject.getCredentials)

// User
api
	.route("/user")
	.all(authentication.middleware)
	.get(userController.list)
	.post(userController.create)

api
	.route("/user/:id")
	.all(authentication.middleware)
	.get(userController.read)
	.delete(userController.delete)

module.exports = api
