const express = require("express")
const api = express.Router()
const auth = require("./controllers/auth")
const smartObject = require("./controllers/smartObject")
const authentication = require("./middleware/authentication")

/* GET home page. */
api.route("/").get((req, res) => res.json({ status: "ok" }))
/* POST login resource */
api.route("/middleware/login").post(auth.login)
/* GET smart-object resource */
api.route("/smart-object").get(authentication.middleware, smartObject.read)

module.exports = api
