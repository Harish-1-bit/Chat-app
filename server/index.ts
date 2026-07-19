  import express, { urlencoded } from "express"
  import dotenv from "dotenv"
  import cookieParser from "cookie-parser"
  import connectDb from "./dbConfig/dbConfig.js"
  import errorHandler from "./middleware/errorMiddleware.js"
  import authRoutes from "./routes/authroutes.js"



  dotenv.config()
  const PORT = process.env.PORT
  const app = express()

  app.use(express.json())
  app.use(cookieParser())
  app.use(urlencoded({extended:true}))

  // test api
  app.get("/", (req, res) => {
    res.json({ message: "Server is running" })
  })

  // login routes
  app.use("/api", authRoutes)

  app.use(errorHandler)

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