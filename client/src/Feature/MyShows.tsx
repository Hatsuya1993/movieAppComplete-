import { motion } from 'framer-motion';
import React from 'react'
import { Link } from 'react-router-dom';
import ButtonComponent from '../Components/ButtonComponent';
import { user_videos } from '../Redux/initialState';
import { actionType } from '../Redux/reducer';
import { useStateValue } from '../Redux/StateProvider';
import { allShows, deleteShows } from '../Utils/fetchShows';
import NoData from '../Img/no-data-icon.jpg'

const MyShows : React.FC = () => {
    const [{get_user_shows}, dispatch] = useStateValue()
    React.useEffect(() => {
        async function fetchData() {
        await getUserShows()
        }
        fetchData();
    }, [])
    const getUserShows = async () => {
        const resp = await allShows()
        dispatch({
            type: actionType.SET_USER_SHOWS,
            get_user_shows: resp.data
        })
    }
    const handleDelete = async (id: number) => {
        let updateData = get_user_shows
        updateData = get_user_shows.filter((each: user_videos) => each.id !== id)
        dispatch({
            type: actionType.SET_USER_SHOWS,
            get_user_shows: updateData
        })
        try {
            await deleteShows(id)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='w-full py-10 flex flex-col gap-5'>
            {get_user_shows && get_user_shows.length > 0 ? get_user_shows.map((each: user_videos) => (
            <motion.div whileTap={{scale: 0.9}} className='bg-slate-100 w-80 mx-auto p-3 rounded-lg shadow-lg flex items-center justify-between'>
                <div className='flex flex-col gap-3'>
                    <p>{each.original_title}</p>
                    <div className='flex gap-3'>
                    <ButtonComponent onClick={() => handleDelete(each.id)}>Delete</ButtonComponent>
                    <Link to={'/detail'} state={each}><ButtonComponent onClick={() => {}}>More Info</ButtonComponent></Link>
                    </div>
                </div>
                <div>
                    <img className='w-20' src={`https://image.tmdb.org/t/p/original/${each.backdrop_path || each.poster_path}`} alt=""/>
                </div>
            </motion.div>
            )) : (
                <div className='w-full h-full flex justify-center items-center'>
                <img className='w-28' src={NoData} alt="" />
                </div>
            )}

        </div>
    )
}

export default MyShows