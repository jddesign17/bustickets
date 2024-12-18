import React from 'react'
import logo from "../../assets/logo.png"

const Navbar = () => {
  return (
    <div className=' border-b border-primary  py-3 sticky top-0 z-50 bg-white'>
        <a className=' flex space-x-2 items-center' href='/'>
            <img src={logo} className=' w-12'/>
            <p className=' text-2xl font-semibold'>Fare Finder</p>
        </a>
        <ul>
            
        </ul>
    </div>
  )
}

export default Navbar