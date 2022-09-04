import express from 'express'
import { postAddShows } from '../Controller/showsController'
import { postRegisterUser, postLoginUser, getLogout, requireAuth } from '../Controller/userController'

export const userRoutes = express.Router()

userRoutes.route("/addShows").post(postAddShows)

userRoutes.route("/registerUser").post(postRegisterUser)

userRoutes.route("/loginUser").post(postLoginUser)

userRoutes.route("/logoutUser").get(getLogout)