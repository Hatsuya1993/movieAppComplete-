import React from 'react'

type InputComponentProp = {
    type: string,
    required: boolean,
    placeholder: string,
    value: React.HTMLInputTypeAttribute,
    name: string,
    onChange: React.ChangeEventHandler<HTMLInputElement>
}

const InputComponent : React.FC<InputComponentProp> = ({name, onChange, placeholder, required, type, value}) => {
    return (
        <input className='placeholder:text-gray-400 w-full h-full text-lg bg-transparent outline-none border-none' onChange={onChange} type={type} required={required} placeholder={placeholder} value={value} name={name} />
    )
}

export default InputComponent