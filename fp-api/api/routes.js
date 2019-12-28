const express = require("express")
const api = express.Router()
const auth = require("./controllers/authenticationController")
const smartObject = require("./controllers/smartObjectController")
const userController = require("./controllers/userController")
const authentication = require("./middleware/authentication")

/* GET home page. */
api.route("/").get((req, res) => res.json({ status: "ok" }))
api.route("/login").post(auth.login)
api.route("/smart-object").get(authentication.middleware, smartObject.read)
api.route("/mqtt/credentials").get(authentication.middleware, smartObject.getCredentials)

// User
api
	.route("/user")
	.get(userController.read)
	.post(userController.create)

api.route("/user/:id").delete(userController.delete)

module.exports = api
