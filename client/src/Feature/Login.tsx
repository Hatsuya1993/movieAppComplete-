import React from 'react'
import ButtonComponent from '../Components/ButtonComponent'
import InputComponent from '../Components/InputComponent'

const Login : React.FC = () => {
    const [userDetails, setUserDetails] = React.useState({
        email: '',
        password: ''
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserDetails({
            ...userDetails, [e.target.name] : e.target.value
        })
    }
    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <div className='w-72 h-64 bg-slate-100 rounded-lg shadow-lg'>
                <div className='p-7 flex flex-col gap-6'>
                    <InputComponent name='email' onChange={handleChange} placeholder='Email' required={true} type='email' value={userDetails.email}/>
                    <InputComponent name='password' onChange={handleChange} placeholder='Password' required={true} type='password' value={userDetails.password}/>
                    <ButtonComponent onClick={() => {}}>Login</ButtonComponent>
                    <ButtonComponent onClick={() => {}}>Register</ButtonComponent>
                </div>
            </div>
        </div>
    )
}

export default Login