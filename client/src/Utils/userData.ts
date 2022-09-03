import axios from 'axios'

export const registerUser = async (email: String, password: String) => {
    try {
        const data = await axios.post(`${process.env.REACT_APP_HEROKU_SERVER || 'http://localhost:8200/'}registerUser`, {
            email,
            password
        }, {
            withCredentials: true
        })
        return data.data.email
    } catch (error) {
        console.log(error)
    }
}

export const loginUser = async (email: String, password: String) => {
    try {
        const data = await axios.post(`${process.env.REACT_APP_HEROKU_SERVER || 'http://localhost:8200/'}loginUser`, {
            email,
            password
        }, {
            withCredentials: true
        })
        return data.data.email
    } catch (error) {
        console.log(error)
    }
}

export const logoutUser = async () => {
    try {
        await axios.get(`${process.env.REACT_APP_HEROKU_SERVER || 'http://localhost:8200/'}logoutUser`)
        return
    } catch (error) {
        console.log(error)
    }
}