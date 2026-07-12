import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import connectDb from "./dbConfig/dbConfig"

dotenv.config()
const app = express()

connectDb()

app.use(express.json())
app.use(cookieParser())
// app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }))   




app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`)
})