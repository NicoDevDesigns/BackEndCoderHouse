import { Router } from "express";
import {getUsers, postUser} from '../controllers/user.controller.js'

const userRouter = Router()

userRouter.get('/', getUsers)
userRouter.post('/', postUser)

export default userRouter