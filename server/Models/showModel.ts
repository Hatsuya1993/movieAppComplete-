import {Schema, model} from 'mongoose'
import {ResultInterface} from '../Interface/showsInterface'

const ShowSchema = new Schema<ResultInterface>({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    original_title: {
        type: String,
        required: true,
    },
    overview: {
        type: String,
        required: true,
    },
    poster_path: {
        type: String,
        required: true,
    },
    release_date: {
        type: String,
        required: true,
    },
    backdrop_path: {
        type: String,
        required: true,
    }
})

export const Show = model<ResultInterface>('Show', ShowSchema)