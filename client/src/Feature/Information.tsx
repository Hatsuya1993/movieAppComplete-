import React, { useEffect } from 'react'
import {CircularProgress} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import ButtonComponent from '../Components/ButtonComponent'
import InputComponent from '../Components/InputComponent'
import { results } from '../Redux/initialState'
import { actionType } from '../Redux/reducer'
import { useStateValue } from '../Redux/StateProvider'
import { getMoviesInfo } from '../Utils/fetchShows'
import NoData from '../Img/no-data-icon.jpg'
import { Link } from 'react-router-dom'

const Information : React.FC = () => {
  const [search, setSearch] = React.useState('')
  const [{loading, get_movies_info}, dispatch] = useStateValue()
  useEffect(() => {
    dispatch({
      type: actionType.SET_LOADING,
      loading: false
  })
    dispatch({
      type: actionType.SET_MOVIES_INFO,
      get_movies_info: []
  })
  }, [])
  const handleSearch = async () => {
      dispatch({
          type: actionType.SET_LOADING,
          loading: true
      })        
      const data = await getMoviesInfo(search)
      dispatch({
          type: actionType.SET_MOVIES_INFO,
          get_movies_info: data.results
      })
      dispatch({
          type: actionType.SET_LOADING,
          loading: false
      })
  }
  return (
    <div className='w-full h-full py-4'>
    <div className='w-80 md:w-[90%] h-full mx-auto'>
    <div className='w-full h-full mt-10 bg-slate-100 p-4 rounded-lg flex flex-col gap-4'>
        <InputComponent name='search' onChange={(e) => setSearch(e.target.value)} placeholder='Enter movie / show name' required={true} type='text' value={search}/>
        <div>
        <ButtonComponent onClick={handleSearch}>Search</ButtonComponent>
        </div>
    </div>
    <div className={`w-full py-10 flex flex-col gap-5 ${get_movies_info?.length > 0 ? 'md:grid md:grid-cols-4' : ''} `}>
    {loading ? (
        <div className='text-center'><CircularProgress isIndeterminate color='orange.300' /></div>
    ) : get_movies_info?.length > 0 ? get_movies_info?.map((each : results) => (
      <Link key={each.id} to={'/detail'} state={each}>
      <motion.div whileTap={{scale:0.9}} className='bg-slate-100 p-3 rounded-lg shadow-lg'>
        <div className='flex items-center'>
          <div className='flex flex-col gap-3'>
            <p>Title: {each.original_title}</p>
            <p>Language: {each.original_language}</p>
          </div>
          <div className='flex items-center'>
            <img className='w-44 rounded-lg object-contain' src={`https://image.tmdb.org/t/p/original/${each.backdrop_path || each.poster_path}`} alt="" />
          </div>
        </div>
        <div>
        </div>
      </motion.div>
      </Link>
    )) : (
        <div className='w-full h-full flex justify-center items-center'>
            <img className='w-28' src={NoData} alt="" />
        </div>
    )}
    </div>
    </div>
</div>
  )
}

export default Information