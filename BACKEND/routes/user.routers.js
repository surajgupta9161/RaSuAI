import express from "express"
import { askAssistant, getCurrentUser, updateAssistant } from "../controllers/user.controllers.js"
import isAuth from "../middlewares/isAuth.js"
import ulpoad from "../middlewares/multer.js"
const userRouter = express.Router()

userRouter.get("/current", isAuth, getCurrentUser)
userRouter.post("/update", isAuth, ulpoad.single("assistantImage"), updateAssistant)
userRouter.post("/asktoassistant", isAuth, askAssistant)


export default userRouter