import { Request, Response } from "express"
import { Error } from "mongoose"
import { ResultInterface } from "../Interface/showsInterface"
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

export const getAllShows = async (req: Request, res: Response) => {
    Show.find({}, (err: Error, result: Array<ResultInterface>) => {
        if(err) {
            res.json({
                "Response": res.statusCode,
                "Error Message": err
            })
        }
        else{
            res.json({
                data: result
            })
        }
    }) 
}

export const deleteShows = async (req: Request, res: Response) => {
    const id = req.params.id
    try {
        await Show.findOneAndDelete({id: id})
        res.json({
            message: `Deleted shows ${id} successfully`
        })
    } catch (error) {
        res.status(400).json({
            "Response": res.statusCode,
            "Error message": error
        })
    }
}