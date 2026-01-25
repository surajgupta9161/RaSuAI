import express from "express"
const app = express()
import dotenv from "dotenv"
dotenv.config()
import ConnectDB from "./config/db.js"
import authRouter from "./routes/auth.routes.js"
import cookieParser from "cookie-parser"

const PORT = process.env.PORT || 8080
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRouter)

app.listen(PORT, () => {
    ConnectDB();
    console.log("Server Running")
})