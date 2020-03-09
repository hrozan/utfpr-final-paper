import express from "express"
import authentication from "../../infra/middleware/authentication"
import * as controller from "./controller"

const router = express.Router()

router
  .route("/")
  .all(authentication.middleware)
  .get(controller.list)
  .post(controller.create)

router
  .route("/:id")
  .all(authentication.middleware)
  .get(controller.read)
  .delete(controller.remove)

export default router
