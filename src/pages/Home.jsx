import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import Banner from '../components/Banner';




const Home = () => {
  const { data: items, isLoading } = useQuery(['items'], () => fetch(`http://localhost:5000/tools`, {
    method: 'GET',
  }).then(res => res.json()))

  if (isLoading) {
    return <div className=' flex justify-center font-bold text-3xl mt-10'><Spinner/></div>
  }
  
  return (
    <div className='pt-20'>
     <Banner />
      <h1 className='text-3xl font-bold text-center my-10'>Inventories</h1>
      <div className='grid md:grid-cols-3 grid-cols-1 gap-3 place-items-center text-center md:px-10 px-1'>
        {items?.slice(0, 6).map(item => <div key={item._id}className='border-2 border-gray-600 p-3 rounded-lg w-full'>
      <img className='w-full h-60' src={item.img} alt="" />
      <p className='font-bold mt-3 text-xl'>{item.name}</p>
      <p>Price: {item.price} TK</p>
      <p className='text-justify h-32 overflow-y-scroll py-2'>{item.description}</p>
      <p>Available quantity :{item.quantity}</p>
      <p>Minimum order quantity:{item.minOrderQuantity}</p>
      <Link to='buy'><button className=' text-white  rounded-md px-4 mt-2 py-2 bg-gray-500 hover:bg-gray-700'>Buy Now</button></Link>

    </div>)}
      </div>
      <div className='text-center mt-10'><Link to='/manageInventory'>  <button  className='px-3 py-3 text-white font-bold hover:bg-gray-700  bg-gray-500 rounded-md'> Manage Inventory</button></Link>
            </div>
     <h2 className="py-2 text-5xl text-center my-24">What our clients say</h2>
        <div className="md:flex justify-between px-10 items-center bg-gray-900 py-10  text-white">
        <div className="md:w-1/2 flex md:justify-start justify-center ">
            <img src="client.png" className='w-7/12 rounded-full' alt="" />

          </div>   
          <div className="md:w-1/2 md:text-2xl order-last mt-4 text-justify">
            <p>"I'm not a fan of buying used cars, and I'm naturally skeptical of the process and those involved. BUT, I can honestly say that the experience of buying a used vehicle from Quality Cars - and dealing with Colin in particular - was excellent. He is professional, well-informed, conscientious and his follow through was perfect. I'm very satisfied and would not hesitate to recommend them or buy another vehicle from them."</p>
            <p className="text-orange-500 font-semibold">Mohidul Islam</p><span>Faunder</span>
          </div>
         
        </div>
      <div className='bg-red-300 mt-10 h-96 text-center'>
        Second extra section
      </div>
    </div>
  )
}

export default Home
