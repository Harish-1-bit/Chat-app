import express from "express";
import roomController from "../controller/room.controller";

const router = express.Router()

// check room
router.post("/check",roomController.getRoom)


export default router

