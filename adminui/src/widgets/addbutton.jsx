import React from 'react'
import { IoMdAddCircle } from "react-icons/io";
const addbutton = ({text}) => {
  return (
    <div className=" flex items-center    bg-black/85 text-white px-4 py-2 rounded-full hover:bg-black/50">
        <IoMdAddCircle />
        <span className="text-xs ml-2">{text}</span>
    </div>
  )
}

export default addbutton