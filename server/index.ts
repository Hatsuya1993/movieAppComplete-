import express, {Express} from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { userRoutes } from './Routes/routes'

dotenv.config({
    path: "./config.env"
})

export const app : Express = express()
app.use(express.json())
app.use(cors({
    credentials: true,
    origin: process.env.SERVER || 'http://localhost:3000'
}))
app.use(cookieParser())
app.use('/', userRoutes)

const DB = process.env.DATABASE!.replace(
    "<password>",
    process.env.DATABASE_PASSWORD!
)

try {
    mongoose.connect(DB)
} catch (error) {
    console.log(`[DB]: ${error}`)
} finally {
    console.log(`[DB]: MongoDB success connect`)
}

app.get('/', (req, res) => {
    res.send('Hello')
})

const port = process.env.PORT || 8200

app.listen(port, () => {
    console.log(`[Server]: Server is running ${port}`)
})