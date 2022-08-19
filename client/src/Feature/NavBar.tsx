import React from 'react'
import Logo from '../Img/logo.png'
import { useAuth } from '../Context/authContext'
import ButtonComponent from '../Components/ButtonComponent'
import { Link } from 'react-router-dom'

const NavBar : React.FC = () => {
    const { currentUser } = useAuth()
return (
    <div className='fixed z-50 w-full bg-gray-100 flex items-center drop-shadow-lg pb-4'>
        <div className='w-full h-full flex flex-col'>
            <div className='w-full'>
                <Link to={'/'}><img className='w-20 mx-auto' src={Logo} alt="Logo" /></Link>
            </div>
            <div className='w-full'>
                <ul className='flex flex-col items-center'>
                    {currentUser ? <ButtonComponent onClick={() => {}}>My Movies</ButtonComponent>: null}
                    {currentUser ? <ButtonComponent onClick={() => {}}>Logout</ButtonComponent> : null}
                </ul>
            </div>
        </div>
    </div>
)
}

export default NavBar