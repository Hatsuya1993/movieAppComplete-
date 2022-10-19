import React from 'react'
import { Link } from 'react-router-dom'
import ButtonComponent from '../Components/ButtonComponent'
import movieVideo from '../Img/movieVideo.mp4'
import { useStateValue } from '../Redux/StateProvider'

const Banner : React.FC = () => {
    const [{user}, dispatch] = useStateValue()
    return (
        <div className='w-full relative'>
            <video muted loop autoPlay src={movieVideo} className='object-fill h-[300px] md:h-[700px] w-full flex items-center justify-center'></video>
            <div className='w-full'>
            <div className='flex flex-col gap-3 absolute md:top-52 top-32 w-full text-center left-0 right-0 ml-auto mr-auto'>
                <p className='text-white text-xl md:text-5xl'>Find The Movies / Shows You Want</p>
                {user ? <p className='text-white md:text-2xl'>Welcome {user}</p> : <Link className='md:mt-12' to={'/login'}><ButtonComponent onClick={() => {}}>Login</ButtonComponent></Link>}
            </div>
            </div>
        </div>
    )
}

export default Banner