import React from 'react'
import Banner from './Banner'
import Options from './Options'

const Main : React.FC = () => {
    return (
        <div className='w-full'>
            <div className='w-full h-full'>
            <Banner />
            </div>
            <div className='w-full h-full'>
            <Options />
            </div>
        </div>
    )
}

export default Main