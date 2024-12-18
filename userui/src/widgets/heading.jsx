import React from 'react'

const Heading = ({maintext,subtext}) => {
  return (
    <div className=' text-3xl font-semibold mt-10'>{maintext}<span className=' text-green-600'>{" "}{subtext}</span></div>
  )
}

export default Heading