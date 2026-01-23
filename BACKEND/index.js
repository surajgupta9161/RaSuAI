import express from "express"
const app = express()
import dotenv from "dotenv"
dotenv.config()
import ConnectDB from "./config/db.js"

const PORT = process.env.PORT

app.listen(PORT, () => {
    ConnectDB();
    console.log("Server Running")
})