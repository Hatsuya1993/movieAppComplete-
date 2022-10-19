import React from 'react'
import Logo from '../Img/logo.png'
import ButtonComponent from '../Components/ButtonComponent'
import { Link } from 'react-router-dom'
import * as ReactRouterDOM from 'react-router-dom'
import { useStateValue } from '../Redux/StateProvider'
import { logoutUser } from '../Utils/userData'
import { actionType } from '../Redux/reducer'

const NavBar : React.FC = () => {
    const navigate = ReactRouterDOM.useNavigate()
    const [{user}, dispatch] = useStateValue()
    const handleLogout = async () => {
        await logoutUser()
        dispatch({
            type: actionType.SET_USER,
            user: ''
        })
        navigate('/login')
    }
return (
    <div className='fixed z-50 w-full bg-gray-100 flex items-center drop-shadow-lg pb-4'>
        <div className='w-full h-full flex flex-col'>
            <div className='w-full'>
                <Link to={'/'}><img className='w-20 mx-auto' src={Logo} alt="Logo" /></Link>
            </div>
            <div className='w-full'>
                <ul className='flex flex-col items-center gap-3 md:flex-row md:justify-center'>
                    {user ? <Link to={`/myShows`}><ButtonComponent onClick={() => {}}>My Shows</ButtonComponent></Link>: null}
                    {user ? <ButtonComponent onClick={handleLogout}>Logout</ButtonComponent> : null}
                </ul>
            </div>
        </div>
    </div>
)
}

export default NavBar