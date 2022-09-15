import axios from "axios";
import { results } from "../Redux/initialState";

export const getShows = async (show: string) => {
    try {
        const dataIP : any = await axios.get(`${process.env.REACT_APP_CORS}https://api.ipdata.co/?api-key=${process.env.REACT_APP_IP_KEY}`)
        const data : any = await axios.get(`${process.env.REACT_APP_CORS}https://serpapi.com/search.json?q=${show}+watch+online&location=${dataIP.data.country_name}&hl=en&gl=us&api_key=${process.env.REACT_APP_GOOGLE_API}`, {
            headers: {
                "accept": "application/json",
                "x-requested-with": "xmlhttprequest",
                "Access-Control-Allow-Origin": "*",
            }
        })
        return data.data
    } catch (error) {
        console.log(error)
    }
}

export const getMoviesInfo = async (name: string) => {
    try {
        const data : any = await axios.get(`${process.env.REACT_APP_CORS}https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIEDB_API}&language=en-US&query=${name}&page=1&include_adult=false`)
        return data.data
    } catch (error) {
        console.log(error)
    }
}

export const getMoviesVideo = async (id: string) => {
    try {
        const data : any = await axios.get(`${process.env.REACT_APP_CORS}https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.REACT_APP_MOVIEDB_API}`)
        return data.data
    } catch (error) {
        console.log(error)
    }
}

export const getShortVideos = async (title : string) => {
    try {
        const data : any = await axios.get(`${process.env.REACT_APP_CORS}https://serpapi.com/search.json?q=${title}&device=mobile&hl=en&gl=us&api_key=${process.env.REACT_APP_GOOGLE_API}`, {
            headers: {
                "accept": "application/json",
                "x-requested-with": "xmlhttprequest",
                "Access-Control-Allow-Origin": "*",
            }
        })
        return data.data
    } catch (error) {
        console.log(error)
    }
}

export const addShows = async (dataShows: results) => {
    try {
        await axios.post(`${process.env.REACT_APP_HEROKU_SERVER || 'http://localhost:8200/'}addShows`, {
            id: dataShows.id,
            original_title: dataShows.original_title,
            overview: dataShows.overview,
            poster_path: dataShows.poster_path,
            release_date: dataShows.release_date,
            backdrop_path: dataShows.backdrop_path
        }, {
            withCredentials: true
        })
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export const allShows = async () => {
    try {
        const data = await axios.get(`${process.env.REACT_APP_HEROKU_SERVER || 'http://localhost:8200/'}allShows`, {
            withCredentials: true,
        })
        return data.data
    }
    catch(error) {
        throw new Error(`${error}`)
    }
}

export const deleteShows = async (id: number) => {
    try {
        await axios.delete(`${process.env.REACT_APP_HEROKU_SERVER || 'http://localhost:8200/'}deleteShows/${id}`, {
            withCredentials: true,
        })
    } catch (error) {
        throw new Error(`${error}`)
    }
}