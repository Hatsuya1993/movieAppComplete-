import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ButtonComponent from '../Components/ButtonComponent'
import {AiOutlineArrowLeft} from 'react-icons/ai'
import { getShortVideos } from '../Utils/fetchShows'
import { useStateValue } from '../Redux/StateProvider'
import { actionType } from '../Redux/reducer'
import NoData from '../Img/no-data-icon.jpg'
import { short_videos } from '../Redux/initialState'
import { motion } from 'framer-motion'
import { CircularProgress } from '@chakra-ui/react'

const ListShowVideos : React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const data : any = location.state
    const [{loading, get_short_videos}, dispatch] = useStateValue()
    useEffect(() => {
        dispatch({
            type: actionType.SET_SHORT_MOVIES,
            get_short_videos: []
        })
        const fetchData = async () => {
            getShortVideosData()
        }
        fetchData();
    }, [])
    const getShortVideosData = async () => {
        dispatch({
            type: actionType.SET_LOADING,
            loading: true
        })  
        const resp = await getShortVideos(data.original_title)      
        dispatch({
            type: actionType.SET_SHORT_MOVIES,
            get_short_videos: resp.short_videos
        })
        dispatch({
            type: actionType.SET_LOADING,
            loading: false
        })
    }
    return (
        <div className='w-full'> 
            <div className='w-[100vw] p-5 mt-10 mx-auto md:w-[90vw]'>
                <div className='py-5'>
                    <ButtonComponent onClick={() => navigate(-1)}><AiOutlineArrowLeft/></ButtonComponent>
                </div>
                <div className='w-72 mx-auto flex flex-col gap-5 md:w-[70vw]'>
                <div>
                    {loading ? (
                        <div className='text-center'><CircularProgress isIndeterminate color='orange.300' /></div>
                    ) : get_short_videos && get_short_videos.length > 0 ? (
                        <div className='flex flex-col gap-3 md:grid md:grid-cols-4 md:gap-7'>
                            {get_short_videos?.map((each: short_videos) => (
                                <motion.div key={each.link} whileTap={{scale: 0.9}} className='bg-slate-100 py-3 rounded-lg'>
                                    <a href={`${each.link}`} target="_blank" rel="noopener noreferrer">
                                    <div className='flex flex-col gap-3 text-center'>
                                        <p>{each.source}</p>
                                        <div>
                                            <img className='mx-auto' src={`${each.thumbnail}`} alt="" />
                                        </div>
                                    </div>
                                    </a>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                    <div className='w-full h-full flex justify-center items-center'>
                    <img className='w-28' src={NoData} alt="" />
                    </div>
                    )}
                </div>
                </div>
            </div>
        </div>
    )
}

export default ListShowVideos