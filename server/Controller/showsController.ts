import { Request, Response } from "express"
import { Show } from "../Models/showModel"

export const postAddShows = async (req: Request, res: Response) => {
    const data = req.body
    try {
        const newShow = new Show(data)
        await newShow.save()
        res.status(200).json({
            data: newShow
        })
    } catch (error) {
        res.status(400).json({
            "Response": res.statusCode,
            "Error message": error
        })
    }
}