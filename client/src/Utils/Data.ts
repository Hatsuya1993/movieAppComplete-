import {FiSearch} from 'react-icons/fi'
import {FaStream} from 'react-icons/fa'
import {BiMoviePlay} from 'react-icons/bi'
import {IconType} from 'react-icons'

export interface DetailsOptionsType {
    id: number,
    title: string,
    desc: string,
    icon: IconType
} 

export const detailsOptions : Array<DetailsOptionsType> = [
    {
        id: 1,
        title: "search",
        desc: "Search for the latest and best movies",
        icon: FiSearch
    },
    {
        id: 2,
        title: "short videos",
        desc: "Watch snippets of your favourite movie",
        icon: FaStream
    },
    {
        id: 3,
        title: "information",
        desc: "Learn more about your favourite movies",
        icon: BiMoviePlay
    }
]