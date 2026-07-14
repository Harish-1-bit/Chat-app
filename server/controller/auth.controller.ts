import { Request, Response } from "express";
import authServices from "../services/auth.services";
import jwt from "jsonwebtoken";
import User from "../models/User.model";

// User login
const userLogin = async (req: Request, res: Response) => {
    try {
        const { email,
            password } = req.body;
        const result = await authServices.login(email, password);
        const accessToken = await generateAccessToken(result);
        const refreshToken = await generateRefreshToken(result);

        res.status(200).cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        }).cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 15 * 60 * 1000 // 15 minutes
        }).json({
            success: true,
            message: "User logged in successfully",
            data: result
        })
    } catch (error: any) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Failed to log in user",
            error: error.message
        })
    }
}

// User Sign Up
const userSignup = async (req: Request, res: Response) => {
    try {
        const {
            fullName,
            email,
            password,
            confirmPassword,
            gender
        } = req.body;
        if(!fullName || !email || !password || !confirmPassword || !gender){
            throw new Error("All fields are required",{cause:{statusCode:401}})
        }
        const result = await authServices.signup(fullName, email, password, confirmPassword, gender);
        res.status(200).json({
            success: true,
            message: "User signed up successfully",
            data: result
        })
    } catch (error: any) {
        console.log(error);
        const statusCode = error.cause?.statusCode || 500;

        res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
}

// Guest Login
const guestLogin =  async(req:Request, res:Response)=>{
    try {
        const user = await authServices.guestLogin()
        const accessToken = await generateAccessToken(user)
        const refreshToken = await generateRefreshToken(user)

        res.cookie("refreshToken",refreshToken,{
            httpOnly:true,
            secure:process.env.NODE_ENV==="production",
            sameSite:"strict",
            maxAge:7 * 24 * 60 * 60 * 1000 
        })
        res.cookie("accessToken",accessToken,{
            httpOnly:true,
            secure:process.env.NODE_ENV==="production",
            sameSite:"strict",
            maxAge:15 * 60 * 1000 
        })
        res.status(200).json({
            success:true,
            message:"Guest login successful",
            data:user
        })
    } catch (error:any) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Failed to log in guest",
            error:error.message
        })
    }
}

// User Logout
const userLogout = async (req: Request, res: Response) => {
    try {
        res.clearCookie("refreshToken").clearCookie("accessToken")
        res.status(200).json({
            success: true,
            message: "User logged out successfully"
        })
    } catch (error: any) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Failed to log out user",
            error: error.message
        })
    }
}


// Generate Access Token
const generateAccessToken = async (user: any) => {
    // const payload={id:user._id, fullName: user.fullName, email: user.email, role:user.role}
    return jwt.sign(user, process.env.JWT_SECRET!, { expiresIn: "15m" })
}

// Generate Refresh Token
const generateRefreshToken = async (user: any) => {
    // const payload={id:user._id, fullName: user.fullName, email: user.email, role:user.role}
    return jwt.sign(user, process.env.JWT_SECRET!, { expiresIn: "7d" })
}

const refreshToken = async (req: Request, res: Response) => {
    try {
        const incomingToken = req.cookies.refreshToken
        if (!incomingToken) {
            throw new Error("Token Not Found")
        }
        const decode = jwt.verify(incomingToken, process.env.JWT_SECRET!)
        if (!decode) {
            throw new Error("Token Invalid")
        }
        const accessToken = await generateAccessToken(decode)
        res.status(200).cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 15 * 60 * 1000 // 15 minutes
        }).json({
            success: true,
            message: "Token refreshed successfully",
            data: decode
        })

    } catch (error: any) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Failed to refresh token",
            error: error.message
        })
    }
}

const authController = { userLogin, userLogout, userSignup, refreshToken, guestLogin }

export default authController