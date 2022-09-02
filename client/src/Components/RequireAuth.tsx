import React from 'react'
import * as ReactRouterDOM from 'react-router-dom'
import { useStateValue } from '../Redux/StateProvider'

type AuthProps = {
    children: React.ReactElement
}

const RequireAuthComponent : React.FC<AuthProps> = ({children}) => {
    const [{user}, dispatch] = useStateValue()
    return (
        user ? children : <ReactRouterDOM.Navigate to={'/login'}/>
    )
}

export default RequireAuthComponent