import { CircularProgress } from '@chakra-ui/react'
import React from 'react'
import { useLocation } from 'react-router-dom'
import { backdrop } from '../Redux/initialState'
import { actionType } from '../Redux/reducer'
import { useStateValue } from '../Redux/StateProvider'
import { getMoviesVideo } from '../Utils/fetchShows'

const Detail : React.FC = () => {
    const location = useLocation()
    const data : any = location.state
    const [{loading, get_movies_images}, dispatch] = useStateValue()
    React.useEffect(() => {
        const fetchData = async () => {
            await getMoviesImages()
        }
        fetchData()
    }, [])
    const getMoviesImages = async () => {
        const dataImages = await getMoviesVideo(data.id)
        dispatch({
            type: actionType.SET_LOADING,
            loading: true
        })
        dispatch({
            type: actionType.SET_MOVIES_IMAGES,
            get_movies_images: dataImages
        })
        dispatch({
            type: actionType.SET_LOADING,
            loading: false
        })
    }
    
    return (
        <div className='w-full h-full p-7'>
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
                    <img src={`https://image.tmdb.org/t/p/original${each.file_path}`} alt="" />
                ))}
            </div>
        </div>
    )
}

export default Detail