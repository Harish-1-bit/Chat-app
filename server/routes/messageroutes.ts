import express from "express"
const router = express.Router()
import messageController from "../controller/message.controller"


router.get("/messages/:id",messageController.getMessages)


export default router