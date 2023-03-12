import React from 'react'

const Slider = ({image}) => {
  return (
    <div className='w-full h-screen'>
      <div style={{ backgroundImage: `url(/${image}` }} className="w-full h-screen bg-center bg-contain  bg-no-repeat">
        <div className='h-full w-full bg-gray-900 bg-opacity-40 flex md:justify-center justify-center items-center'>
         <div className='w-1/2 italic'>
         <p className='font bold md:text-4xl text-2xl text-white'>Welcome to...</p>
         <p className='font bold md:text-7xl text-4xl text-orange-500 mt-4'>Power Tools Manufacturing</p>

         <p className='font bold text-2xl text-white mt-4 hidden md:block'> High quality machinery partners, suppliers and customers available here. Keep Taiwan's top-end machine tool suppliers within a hand's reach. Products to Purchase. Guidebook to Publish. Suppliers to Search. </p>
         </div>
        </div>
      </div>
    </div>
  )
}

export default Slider
