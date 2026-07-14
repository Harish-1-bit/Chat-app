import jwt from "jsonwebtoken"
import { NextFunction, Request, Response } from "express";

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.accessToken
        if (!token) {
            throw new Error("Token Not Found")
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET!)
        if (!decode) {
            throw new Error("Token Invalid")
        }
        req.user = decode
        next()
    } catch (error: any) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Failed to verify token",
            error: error.message
        })
    }
}

export default verifyToken