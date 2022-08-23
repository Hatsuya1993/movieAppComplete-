import React from 'react'
import { Link } from 'react-router-dom'
import ButtonComponent from '../Components/ButtonComponent'
import { useAuth } from '../Context/authContext'
import movieVideo from '../Img/movieVideo.mp4'

const Banner : React.FC = () => {
    const { currentUser } = useAuth()
    return (
        <div className='w-full relative'>
            <video muted loop autoPlay src={movieVideo} className='object-fill h-[300px] md:h-[700px] w-full flex items-center justify-center'></video>
            <div className='w-full'>
            <div className='flex flex-col gap-3 absolute md:top-52 top-32 w-full text-center left-0 right-0 ml-auto mr-auto'>
                <p className='text-white text-xl md:text-3xl'>Find The Movies / Shows You Want</p>
                {currentUser ? currentUser.email && <p className='text-white'>Welcome {currentUser.email}</p> : <Link to={'/login'}><ButtonComponent onClick={() => {}}>Login</ButtonComponent></Link>}
            </div>
            </div>
        </div>
    )
}

export default Banner