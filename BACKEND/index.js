import express from "express"
const app = express()
import dotenv from "dotenv"
dotenv.config()
import ConnectDB from "./config/db.js"
import authRouter from "./routes/auth.routes.js"
import cookieParser from "cookie-parser"
import cors from "cors"

const PORT = process.env.PORT || 8000
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use("/api/auth", authRouter)

app.listen(PORT, () => {
    ConnectDB();
    console.log("Server Running")
})