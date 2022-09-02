import express from 'express'
import { postRegisterUser, postLoginUser, getLogout, requireAuth } from '../Controller/userController'

export const userRoutes = express.Router()

userRoutes.route("/registerUser").post(postRegisterUser)

userRoutes.route("/loginUser").post(postLoginUser)

userRoutes.route("/logoutUser").get(getLogout)