import { Router } from "express";
import authController from "../controller/auth.controller";
import verifyToken from "../middleware/authMiddleWare";

const router = Router()


// login 
router.post("/login",  authController.userLogin)

// signup
router.post("/sign-up",  authController.userSignup)

// logout
router.post("/logout", authController.userLogout)

// refresh token
router.post("/refresh", authController.refreshToken)

// // Guest Login
// router.post("/guest-Login",authController.guestLogin)

export default router