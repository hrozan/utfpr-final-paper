const express = require("express")
const api = express.Router()
const auth = require("./controllers/auth")
const smartObject = require("./controllers/smartObject")
const authentication = require("./middleware/authentication")

/* GET home page. */
api.route("/").get((req, res) => res.json({ status: "ok" }))
/* POST login resource */
api.route("/auth/login").post(auth.login)
/* GET smart-object resource */
api.route("/smart-object").get(authentication.middleware, smartObject.read)
/* GET mqtt broker con credentials */
api.route("/mqtt/credentials").get(authentication.middleware, smartObject.getCredentials)

module.exports = api
