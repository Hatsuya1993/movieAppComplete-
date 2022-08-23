import axios from "axios";

const getUserLocation = async () => {
    const data = await axios.get('http://ip-api.com/json/')
    return data.data.country
}

export const getShows = async (show: string) => {
    const country = await getUserLocation()
    try {
        const data : any = await axios.get(`${process.env.REACT_APP_CORS}https://serpapi.com/search.json?q=${show}+watch+online&location=${country}&hl=en&gl=us&api_key=${process.env.REACT_APP_GOOGLE_API}`)
        return data.data
    } catch (error) {
        console.log(error)
    }
}