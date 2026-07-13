import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import connectDb from "./dbConfig/dbConfig"
import errorHandler from "./middleware/errorMiddleware"

dotenv.config()
const PORT = process.env.PORT
const app = express()

app.use(express.json())
app.use(cookieParser())

const startServer = async () => {
  try {
    await connectDb()
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`)
    })
  } catch (err) {
    console.error("Failed to connect to DB:", err)
    process.exit(1)
  }
}

startServer()