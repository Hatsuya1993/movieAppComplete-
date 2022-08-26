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

export const getMoviesInfo = async (name: string) => {
    try {
        const data : any = await axios.get(`${process.env.REACT_APP_CORS}https://api.themoviedb.org/3/search/movie?api_key=9e6e12d7297410647964bde712f4aa28&language=en-US&query=${name}&page=1&include_adult=false`)
        return data.data
    } catch (error) {
        console.log(error)
    }
}

export const getMoviesVideo = async (id: string) => {
    try {
        const data : any = await axios.get(`${process.env.REACT_APP_CORS}https://api.themoviedb.org/3/movie/${id}/images?api_key=9e6e12d7297410647964bde712f4aa28`)
        return data.data
    } catch (error) {
        console.log(error)
    }
}