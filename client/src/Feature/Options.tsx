import React from 'react'
import { detailsOptions, DetailsOptionsType } from '../Utils/Data'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const Options : React.FC = () => {
    return (
        <div className='w-full h-full'>
            <div className='py-16 px-7'>
            <div className='w-52 md:w-full mx-auto flex flex-col gap-10 justify-center md:flex-row'>
                {detailsOptions.map((each: DetailsOptionsType) => (
                    <Link to={`/${each.title}`} key={each.id}>
                    <motion.div  whileTap={{scale: 0.9}} className='bg-slate-100 text-center p-7 flex flex-col gap-3 items-center rounded-lg shadow-lg cursor-pointer'>
                    <h1 className='md:text-3xl text-lg'>{each.title.toUpperCase()}</h1>
                    <p>{each.desc}</p>
                    <each.icon className='md:text-4xl text-lg'/>
                </motion.div></Link>
                ))}
            </div>
            </div>
        </div>
    )
}

export default Options