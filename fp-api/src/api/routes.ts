import express from "express"
import authenticationController from "./controllers/authenticationController"
import smartObject from "./controllers/smartObjectController"
import userController from "./controllers/userController"
import authentication from "./middleware/authentication"

const api = express.Router()
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

export default api
