import { motion } from 'framer-motion';
import React from 'react'
import { Link } from 'react-router-dom';
import { user_videos } from '../Redux/initialState';
import { actionType } from '../Redux/reducer';
import { useStateValue } from '../Redux/StateProvider';
import { allShows } from '../Utils/fetchShows';

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
    return (
        <div className='w-full py-10 flex flex-col gap-5'>
            {get_user_shows && get_user_shows.length > 0 ? get_user_shows.map((each: user_videos) => (
            <Link to={'/detail'} state={each}>
            <motion.div whileTap={{scale: 0.9}} className='bg-slate-100 w-80 mx-auto p-3 rounded-lg shadow-lg flex flex-col gap-3'>
                <div>
                    <p>{each.original_title}</p>
                </div>
                <div>
                    <img src={`https://image.tmdb.org/t/p/original/${each.backdrop_path || each.poster_path}`} alt=""/>
                </div>
            </motion.div>
            </Link>
            )) : (
                null
            )}

        </div>
    )
}

export default MyShows