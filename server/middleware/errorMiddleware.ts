import { ErrorRequestHandler, NextFunction, Request, Response } from "express"

const errorHandler:ErrorRequestHandler = async(err,req,res,next )=>{
    const statusCode = res.statusCode <=200 ? 500 : res.statusCode
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}


export default errorHandler