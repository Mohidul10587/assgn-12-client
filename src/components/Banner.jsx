import React from 'react'

const Slider = () => {
  return (
    <div className='w-full h-screen'>
      <div style={{ backgroundImage: "url(/vite.svg)" }} className="w-full h-screen bg-center bg-contain bg-no-repeat">
        <div className='h-full w-full bg-gray-900 bg-opacity-40 flex md:justify-end justify-center items-center'>
         <div className='w-1/2'>
         <p className='font bold md:text-4xl text-2xl text-white'>Welcome to..</p>
         <p className='font bold md:text-7xl text-4xl text-orange-500 mt-4'>Bike Warehouse</p>

         <p className='font bold text-2xl text-white mt-4 hidden md:block'> Biker’s Warehouse is one of Johannesburg’s top bike and accessory brand suppliers. Our brands are carefully selected to offer the widest product range to cater for the needs of any road, dual-sport or off-road enthusiast. Added to our emphasis on rigorous parts support, our service department is fully equipped to ensure that all servicing, repair and modification requirements are taken care of quickly and professionally. Biker’s Warehouse is proud dealers for Honda motorcycles, Husqvarna motorcycles and Suzuki Motorcycles. We also offer various quality imported motorcycles.</p>
         </div>
        </div>
      </div>
    </div>
  )
}

export default Slider
