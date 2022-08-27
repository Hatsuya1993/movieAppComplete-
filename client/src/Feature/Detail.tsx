import { CircularProgress } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import React from 'react'
import { useLocation } from 'react-router-dom'
import { available_on_type, backdrop } from '../Redux/initialState'
import { actionType } from '../Redux/reducer'
import { useStateValue } from '../Redux/StateProvider'
import { getMoviesVideo, getShows } from '../Utils/fetchShows'

const Detail : React.FC = () => {
    const location = useLocation()
    const data : any = location.state
    const [{loading, get_movies_images, available_on}, dispatch] = useStateValue()
    React.useEffect(() => {
        const fetchData = async () => {
            await getMovies()
        }
        fetchData()
    }, [])
    const getMovies = async () => {
        const dataImages = await getMoviesVideo(data.id)
        const dataAvailable = await getShows(data.original_title)
        dispatch({
            type: actionType.SET_LOADING,
            loading: true
        })
        dispatch({
            type: actionType.SET_MOVIES_IMAGES,
            get_movies_images: dataImages
        })
        dispatch({
            type: actionType.SET_AVAILABLE_ON,
            available_on: dataAvailable.available_on
        })
        dispatch({
            type: actionType.SET_LOADING,
            loading: false
        })
    }
    
    return (
        <div className='w-full h-full p-7 flex flex-col gap-5'>
            <div className='bg-slate-100 w-80 mx-auto p-3 rounded-lg'>
            <div className='w-full flex flex-col gap-4'>
                <div className='w-full'>
                    <img className='rounded-lg' src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`} alt="" />
                </div>
                <div className='w-full flex flex-col gap-2'>
                <p>Title: {data.original_title}</p>
                <p>Overview: {data.overview}</p>
                <p>Release Date: {data.release_date}</p>
                </div>
            </div>
            </div>
            <div className='w-80 mx-auto p-3 flex items-center scroll-smooth overflow-x-scroll gap-3 scrollbar-thumb-gray-100 scrollbar-track-transparent scrollbar-thin'>
                {loading ? <div className='w-full text-center'>
                    <CircularProgress size='50px' isIndeterminate color='orange.400' /></div>
                : get_movies_images && get_movies_images.backdrops.length > 0 &&  get_movies_images.backdrops.map((each : backdrop) => (
                    <img key={each.file_path} src={`https://image.tmdb.org/t/p/original${each.file_path}`} alt="" />
                ))}
            </div>
            <div className='w-80 mx-auto flex flex-col gap-3'>
                <p className='text-center'>Available On</p>
                {loading ? <div className='w-full text-center'>
                    <CircularProgress size='50px' isIndeterminate color='orange.400' /></div> : available_on && available_on.length > 0 ? (
                        <div className='flex flex-col gap-3'>
                            {available_on.map((each : available_on_type) => (
                                <a href={`${each.link}`} target="_blank" rel="noopener noreferrer" key={each.name}>
                            <motion.div whileTap={{scale:0.9}} className='bg-slate-100 p-2 rounded-lg flex items-center justify-between'>
                                <div>
                                <p>{each.name}</p>
                                <p>Price: {each.price}</p>
                                </div>
                                <div>
                                    <img src={`${each.thumbnail}`} alt="" />
                                </div>
                            </motion.div>
                            </a>
                        ))}
                        </div>

                    ) : null}
            </div>
        </div>
    )
}

export default Detail