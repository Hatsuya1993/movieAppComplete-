import {Schema, model} from 'mongoose'
import {UserInterface} from '../Interface/userInterface'

const userSchema = new Schema<UserInterface>({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Minimum password length is 6 characters']
    }
})

export const User = model<UserInterface>('User', userSchema)