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
        title: "Search",
        desc: "Search for the latest and best movies",
        icon: FiSearch
    },
    {
        id: 2,
        title: "Latest",
        desc: "Always be updated with the latest movies",
        icon: FaStream
    },
    {
        id: 3,
        title: "Watch",
        desc: "Watch anytime and anywhere",
        icon: BiMoviePlay
    }
]