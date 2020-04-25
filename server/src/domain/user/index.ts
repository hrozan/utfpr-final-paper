import express from "express"
import * as controller from "./controller"

const router = express.Router()

router.post("/user", async (req, res) => controller.createUser({ req, res }))

export default router
