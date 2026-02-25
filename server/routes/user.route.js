import express from "express"
import isAuth from "../middlewares/isAuth.js"
import { getCurrentUser, getProfile, updateProfile } from "../controllers/user.controller.js"


const userRouter = express.Router()

userRouter.get("/current-user", isAuth, getCurrentUser)
userRouter.get("/profile", isAuth, getProfile)
userRouter.patch("/profile", isAuth, updateProfile)

export default userRouter