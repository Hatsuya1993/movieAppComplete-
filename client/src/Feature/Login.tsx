import React from 'react'
import ButtonComponent from '../Components/ButtonComponent'
import InputComponent from '../Components/InputComponent'
import { useAuth } from '../Context/authContext'
import * as ReactRouterDOM from 'react-router-dom'

const Login : React.FC = () => {
    const navigate = ReactRouterDOM.useNavigate()
    const {login} = useAuth()
    const [userDetails, setUserDetails] = React.useState({
        email: '',
        password: ''
    })
    const [error, setError] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserDetails({
            ...userDetails, [e.target.name] : e.target.value
        })
    }
    const handleLogin = async () => {
        if(userDetails.email === '' || userDetails.password === ''){
            setError(true)
            setErrorMessage('Please input all fields')
            setTimeout(() => {
                setError(false)
                setErrorMessage('')
            }, 5000)
        }
        else{
            try {
                await login(userDetails.email, userDetails.password)
                navigate('/')
            } catch (error) {
                console.log(error)
                setError(true)
                setErrorMessage('Login error')
                setTimeout(() => {
                    setError(false)
                    setErrorMessage('')
                }, 5000)
            }
        }
    }
    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <div className='w-72 bg-slate-100 rounded-lg shadow-lg'>
                <div className='p-7 flex flex-col gap-6'>
                    {error && errorMessage !== '' && <p className='text-center'>{errorMessage}</p>}
                    <InputComponent name='email' onChange={handleChange} placeholder='Email' required={true} type='email' value={userDetails.email}/>
                    <InputComponent name='password' onChange={handleChange} placeholder='Password' required={true} type='password' value={userDetails.password}/>
                    <ButtonComponent onClick={handleLogin}>Login</ButtonComponent>
                    <ButtonComponent onClick={() => {}}>Register</ButtonComponent>
                </div>
            </div>
        </div>
    )
}

export default Login