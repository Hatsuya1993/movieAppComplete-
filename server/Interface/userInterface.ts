export interface UserInterface {
    email: {
        type: String,
        required: Array<boolean | String>,
        unique: boolean,
        lowercase: boolean,
        validator: []
    },
    password: {
        type: String,
        required: Array<boolean | String>,
        minlength: Array<number | String>
    }
}