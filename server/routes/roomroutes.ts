import express from "express";
import roomController from "../controller/room.controller";

const router = express.Router()

// check room
router.post("/ensure",roomController.ensureRoom)


export default router

