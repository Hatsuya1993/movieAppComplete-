import { CircularProgress } from '@chakra-ui/react'
import React from 'react'
import ButtonComponent from '../Components/ButtonComponent'
import InputComponent from '../Components/InputComponent'
import { results } from '../Redux/initialState'
import { actionType } from '../Redux/reducer'
import { useStateValue } from '../Redux/StateProvider'
import { getMoviesInfo } from '../Utils/fetchShows'

const ShortVideos : React.FC = () => {
  const [search, setSearch] = React.useState('')
  const [{loading, get_movies_info}, dispatch] = useStateValue()
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
    <div className='w-full h-full bg-slate-100 p-4 rounded-lg flex flex-col gap-4'>
        <InputComponent name='search' onChange={(e) => setSearch(e.target.value)} placeholder='Enter movie / show name' required={true} type='text' value={search}/>
        <div>
        <ButtonComponent onClick={handleSearch}>Search</ButtonComponent>
        </div>
    </div>
    <div className='py-10 flex flex-col gap-5 md:flex-row md:grid md:grid-cols-4'>
    {loading ? (
        <div className='text-center'><CircularProgress isIndeterminate color='orange.300' /></div>
    ) : get_movies_info?.length > 0 ? get_movies_info.map((each : results) => (
      <div className='bg-red-400'>
        {each.original_title}
      </div>
    )) : (
        <div className='w-full h-full flex justify-center items-center'>
            {/* <img className='w-28' src={NoData} alt="" /> */}
        </div>
    )}
    </div>
    </div>
</div>
  )
}

export default ShortVideos