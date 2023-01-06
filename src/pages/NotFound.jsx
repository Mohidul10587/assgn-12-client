import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='min-h-[550px] flex justify-center items-center'>

        <div >
        <p className='text-4xl text-center'> 404</p>
        <p className=' text-center'>Page Not found</p>
        <Link to='/' className='text-gray-600 text-center'>Go to home page</Link>
        </div>


    </div>
  )
}

export default NotFound