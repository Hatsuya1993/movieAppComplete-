import { CircularProgress } from '@chakra-ui/react'
import React from 'react'
import ButtonComponent from '../Components/ButtonComponent'
import InputComponent from '../Components/InputComponent'
import { actionType } from '../Redux/reducer'
import { useStateValue } from '../Redux/StateProvider'
import { getMoviesInfo } from '../Utils/fetchShows'
import NoData from '../Img/no-data-icon.jpg'
import { results } from '../Redux/initialState'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const ShortVideos : React.FC = () => {
  const [search, setSearch] = React.useState('')
  const [{loading, get_movies_info}, dispatch] = useStateValue()
  React.useEffect(() => {
    dispatch({
        type: actionType.SET_MOVIES_INFO,
        get_movies_info: []
    })
}, [])
  const handleSearch = async () => {
    const data = await getMoviesInfo(search)
    dispatch({
      type: actionType.SET_LOADING,
      loading: true
  })   
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
    <div className='w-full p-5 h-full'>
      <div className='w-80 mx-auto flex flex-col gap-10'>
        <div className='bg-slate-100 w-full rounded-lg p-4 flex flex-col gap-5'>
            <InputComponent name='search' onChange={(e) => setSearch(e.target.value)} placeholder='Search movies or shows' required={true} type='text' value={search}/>
            <ButtonComponent onClick={handleSearch}>Search</ButtonComponent>
        </div>
        <div className='w-full'>
          <div className='flex flex-col gap-8'>
          {loading ? <div className='text-center'><CircularProgress isIndeterminate color='orange.300' /></div> : (
              get_movies_info && get_movies_info.length > 0 ? get_movies_info.map((each : results ) => (
                <Link key={each.id} to={`/short%20videos/${each.original_title}`} state={each}>
                <motion.div key={each.id} whileTap={{scale:0.9}} className='bg-slate-100 p-3 w-full rounded-lg drop-shadow-lg flex flex-col gap-3'>
                  <div className='flex flex-col gap-2'>
                    <p>Title: {each.original_title}</p>
                    <p>Language: {each.original_language}</p>
                  </div>
                  <div>
                    <img className='rounded-lg' src={`https://image.tmdb.org/t/p/original/${each.backdrop_path}`} alt="" />
                  </div>
                </motion.div>
                </Link>
              )) : (
                <div className='w-full h-full flex justify-center items-center'>
                <img className='w-28' src={NoData} alt="" />
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShortVideos