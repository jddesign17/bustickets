import React from 'react'

const Button = ({text}) => {
  return (
    <button className=" w-full py-3 px-2 border border-gray-400 text-sm rounded-lg mt-6 bg-green-600 hover:bg-green-500 text-white">{text}</button>
  )
}

export default Button