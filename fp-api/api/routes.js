const express = require("express")
const api = express.Router()
const auth = require("./controllers/authenticationController")
const smartObject = require("./controllers/smartObjectController")
const userController = require("./controllers/userController")
const authentication = require("./middleware/authentication")

/* GET home page. */
api.route("/").get((req, res) => res.json({ status: "ok" }))
/* POST login resource */
api.route("/login").post(auth.login)
/* GET smart-object resource */
api.route("/smart-object").get(authentication.middleware, smartObject.read)
/* GET mqtt broker con credentials */
api.route("/mqtt/credentials").get(authentication.middleware, smartObject.getCredentials)

// Useradd
api.route("/users").post(authentication.middleware, userController.create)

module.exports = api
