import express from "express"
import * as controller from "./controller"
import authentication from "../../infra/middleware/authentication"

const router = express.Router()
router.route("/credentials").get(authentication.middleware, controller.getCredentials)

export default router
