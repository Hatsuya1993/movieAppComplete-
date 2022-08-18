import { motion } from 'framer-motion'
import React from 'react'

type ButtonComponentProp = {
    onClick: React.MouseEventHandler<HTMLButtonElement>,
    children: React.ReactNode
}

const ButtonComponent : React.FC<ButtonComponentProp> = ({children, onClick}) => {
    return (
        <motion.button whileTap={{scale:0.9}} className='bg-white p-1 rounded-lg shadow-md' onClick={onClick}>
            {children}
        </motion.button>
    )
}

export default ButtonComponent