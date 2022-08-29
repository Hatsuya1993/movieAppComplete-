import { CircularProgress } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import React from 'react'
import ButtonComponent from '../Components/ButtonComponent'
import InputComponent from '../Components/InputComponent'
import NoData from '../Img/no-data-icon.jpg'
import { available_on_type } from '../Redux/initialState'
import { actionType } from '../Redux/reducer'
import { useStateValue } from '../Redux/StateProvider'
import { getShows } from '../Utils/fetchShows'

const Search : React.FC = () => {
    const [search, setSearch] = React.useState('')
    const [{loading, available_on}, dispatch] = useStateValue()
    React.useEffect(() => {
        dispatch({
            type: actionType.SET_AVAILABLE_ON,
            available_on: {}
        })
    }, [])
    const handleSearch = async () => {
        dispatch({
            type: actionType.SET_LOADING,
            loading: true
        })        
        const data = await getShows(search)
        dispatch({
            type: actionType.SET_AVAILABLE_ON,
            available_on: data.available_on
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
            ) : available_on?.length > 0 ? available_on.map((each : available_on_type) => (
                <a href={`${each.link}`} target="_blank" rel="noopener noreferrer" key={each.name}>
                    <motion.div whileTap={{scale : 0.9}} className='w-full'>
                    <div className='bg-slate-100 w-[90%] mx-auto p-4 rounded-lg drop-shadow-lg flex items-center justify-between'>
                        <div className='flex flex-col gap-3'>
                        <p>Channel : {each.name}</p>
                        <p>Subscription : </p>
                        <p>{each.price}</p>
                        </div>
                        <div>
                            <img src={`${each.thumbnail}`} alt="" />
                        </div>
                    </div>
                </motion.div>
                </a>
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

export default Search