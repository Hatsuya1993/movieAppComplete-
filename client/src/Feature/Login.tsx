import React from 'react'
import ButtonComponent from '../Components/ButtonComponent'
import InputComponent from '../Components/InputComponent'
import * as ReactRouterDOM from 'react-router-dom'
import { loginUser, registerUser } from '../Utils/userData'
import { useStateValue } from '../Redux/StateProvider'
import { actionType } from '../Redux/reducer'

const Login : React.FC = () => {
    const [{}, dispatch] = useStateValue()
    const navigate = ReactRouterDOM.useNavigate()
    const [userDetails, setUserDetails] = React.useState({
        email: '',
        password: ''
    })
    const [displayMessage, setDisplayMessage] = React.useState(false)
    const [message, setMessage] = React.useState("")
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserDetails({
            ...userDetails, [e.target.name] : e.target.value
        })
    }
    const handleLogin = async () => {
        if(userDetails.email === '' || userDetails.password === ''){
            setDisplayMessage(true)
            setMessage('Please input all fields')
            setTimeout(() => {
                setDisplayMessage(false)
                setMessage('')
            }, 5000)
        }
        else{
            try {
                const email = await loginUser(userDetails.email, userDetails.password)
                dispatch({
                    type: actionType.SET_USER,
                    user: email
                })
                navigate('/')
            } catch (error) {
                console.log(error)
                setDisplayMessage(true)
                setMessage('Login error')
                setTimeout(() => {
                    setDisplayMessage(false)
                    setMessage('')
                }, 5000)
            }
        }
    }
    const handleRegister = async () => {
        if(userDetails.email === '' || userDetails.password === '') {
            setDisplayMessage(true)
            setMessage('All fields required')
            setTimeout(() => {
                setDisplayMessage(false)
                setMessage('')
            }, 5000)
        }
        else{
            try {
                const email = await registerUser(userDetails.email, userDetails.password)
                dispatch({
                    type: actionType.SET_USER,
                    user: email
                })
                navigate('/')
            } catch (error) {
                console.log(error)
                setDisplayMessage(true)
                setMessage('Register error')
                setTimeout(() => {
                    setDisplayMessage(false)
                    setMessage('')
                }, 5000)
            }
        }
    }
    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <div className='w-72 bg-slate-100 rounded-lg shadow-lg'>
                <div className='p-7 flex flex-col gap-6'>
                    {displayMessage && message !== '' && <p className='text-center'>{message}</p>}
                    <InputComponent name='email' onChange={handleChange} placeholder='Email' required={true} type='email' value={userDetails.email}/>
                    <InputComponent name='password' onChange={handleChange} placeholder='Password' required={true} type='password' value={userDetails.password}/>
                    <ButtonComponent onClick={handleLogin}>Login</ButtonComponent>
                    <ButtonComponent onClick={handleRegister}>Register</ButtonComponent>
                </div>
            </div>
        </div>
    )
}

export default Login