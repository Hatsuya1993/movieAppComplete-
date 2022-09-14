import { Request, Response, NextFunction } from "express"
import bcrypt from "bcryptjs"
import { User } from "../Models/userModel"
import jwt from "jsonwebtoken"

const maxAge = 3 * 24 * 60 * 60
const createToken = (id: any) => {
    return jwt.sign({id}, process.env.SECRET_KEY!, {
        expiresIn: maxAge
    })
}

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt
    if(token) {
        jwt.verify(token, process.env.SECRET_KEY!, (err: any, decodedToken: any) => {
            if(err){
                res.json({
                    statusMessage: "User not authenticated"
                })
            }
            else{
                next()
            }
        })
    }
    else{
        res.json({
            statusMessage: "User not authenticated"
        })
    }
}

export const postRegisterUser = async (req: Request, res: Response) => {
    const userDetails = req.body
    const salt = await bcrypt.genSalt()
    userDetails.password = await bcrypt.hash(userDetails.password, salt)
    try {
        const user = await User.create({
            email: userDetails.email,
            password: userDetails.password
        })
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000, sameSite: "none"})
        res.json({
            statusCode: 200,
            email: userDetails.email,
            statusMessage: 'User registered'
        })
    } catch (error) {
        res.json({
            response: res.statusCode,
            errorMessage: error
        })
    }
}

export const postLoginUser = async (req: Request, res: Response) => {
    const userDetails = req.body
    const user = await User.findOne({email: userDetails.email})
    if(user){
        const auth = await bcrypt.compare(userDetails.password, String(user.password))
        if(auth) {
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000, sameSite: "none"})
        res.json({
            statusCode: 200,
            email: userDetails.email,
            statusMessage: 'User logged in'
        })
        }
        else{
            res.json({
                response: res.statusCode,
                errorMessage: "Incorrect Password"
            })
        }
    }
    else{
        res.json({
            response: res.statusCode,
            errorMessage: "Incorrect Email"
        })
    }
}

export const getLogout = async (req: Request, res: Response) => {
    res.cookie('jwt', '', {maxAge: 1})
    res.json({
        response: res.statusCode,
        statusMessage: "User logged out"
    })
}