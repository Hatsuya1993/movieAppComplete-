import express from 'express'
import { postAddShows, getAllShows } from '../Controller/showsController'
import { postRegisterUser, postLoginUser, getLogout, requireAuth } from '../Controller/userController'

export const userRoutes = express.Router()

userRoutes.route("/allShows").get(requireAuth, getAllShows)

userRoutes.route("/addShows").post(requireAuth, postAddShows)

userRoutes.route("/registerUser").post(postRegisterUser)

userRoutes.route("/loginUser").post(postLoginUser)

userRoutes.route("/logoutUser").get(getLogout)