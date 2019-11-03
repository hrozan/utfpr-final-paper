const express = require("express")
const api = express.Router()
const auth = require("./resources/auth")

/* GET home page. */
api.route("/").get((req, res) => res.json({ status: "ok" }))
/* POST login resource */
api.route("/auth/login").post(auth.login)

module.exports = api
