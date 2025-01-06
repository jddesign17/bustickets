import React from 'react'
import Lottie from 'lottie-react'
import loadingdata from "../../assets/loading.json"

const Loading = () => {
  return (
    <div className='bg-primary w-full h-screen fixed flex justify-center items-center'>
        <Lottie loop={true} animationData={loadingdata} className=' lg:w-20 w-20' />
    </div>
  )
}

export default Loading