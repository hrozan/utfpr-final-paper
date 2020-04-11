import express from "express"
import * as controller from "./controller"

const router = express.Router()

router.post("/user", async (req, res) => {
  const data = req.body
  const id = await controller.createUser(data)
  return res.status(201).json({ id })
})

export default router
