
import React from 'react'
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import Banner from '../components/Banner';
import { FiFlag } from 'react-icons/fi';
import { FaUsers } from 'react-icons/fa';
import { AiFillLike } from 'react-icons/ai';
import { HiTemplate } from 'react-icons/hi';
import { CgDollar } from 'react-icons/cg';
import { useQuery } from '@tanstack/react-query';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from './Authentication/firebase.init';

const Home = () => {

  const [user] = useAuthState(auth);
  
  const userEmail = user.email
  const { data: items, isLoading } = useQuery(['items'], () => fetch(`http://localhost:5000/tools`, {
    method: 'GET',
  }).then(res => res.json()))

  const { data: reviews, isLoadingReview } = useQuery(['reviews'], () => fetch(`http://localhost:5000/reviews/${userEmail}`, {
    method: 'GET',
  }).then(res => res.json()))
  console.log(reviews)


  if (isLoading) {
    return <div className=' flex justify-center font-bold text-3xl pt-20 min-h-screen'><Spinner /></div>
  }
  if (isLoadingReview) {
    return <div className=' flex justify-center font-bold text-3xl pt-20 min-h-screen'><Spinner /></div>
  }
  

  return (
    <div className=''>
      <Banner />
      <h1 className='text-4xl font-bold text-center my-10'>Tools Gallery</h1>
      <button className='btn'><a href="https://courier.uddoktarbazar.com/">Go to courier</a>
      </button>
      {items ? <div className='grid md:grid-cols-3 grid-cols-1 gap-3 place-items-center text-center md:px-10 px-1'>
        {items?.slice(0, 6).map(item => <div key={item._id} className='border-2 border-teal-600 overflow-hidden rounded-lg w-full'>
          <img className='w-full h-60 border-b-2 border-teal-600' src={item.img} alt="" />
          <div className='p-3'>
            <p className='font-bold mt-3 text-xl'>{item.name}</p>
            <p>Price: {item.price} TK</p>
            <p className='text-justify h-32 overflow-y-scroll py-2'>{item.description}</p>
            <p>Available quantity :{item.quantity}</p>
            <p>Minimum order quantity:{item.minOrderQuantity}</p>
            <Link to={`buy/${item._id}`}><button className=' text-white  rounded-md px-4 mt-2 py-2 bg-teal-700'>Buy Now</button></Link>

          </div>
        </div>)}
      </div>
        : <div className=' flex justify-center font-bold text-3xl pt-20 min-h-screen'><Spinner /></div>}

      {/* Bushiness Summary */}

      <h1 className='text-4xl font-bold text-center  mt-20'>At a Glance</h1>
      <h1 className='text-xl text-center '>We are one of your business partner</h1>
      <div className='flex justify-between px-20 mt-20'>
        <div className='flex justify-center items-center border-[1px] border-teal-400 h-44 w-44'>
          <div className='text-center'>
            <p className='flex justify-center text-4xl text-teal-600'><FiFlag /></p>
            <p className='text-4xl mt-4 font-bold'>72</p>
            <p className='text-teal-600 font-bold'>Countries</p>
          </div>
        </div>
        <div className='flex justify-center items-center border-[1px] border-teal-400 h-44 w-44'>
          <div className='text-center'>
            <p className='flex justify-center text-4xl text-teal-600'><FaUsers /></p>
            <p className='text-4xl mt-4 font-bold'>480+</p>
            <p className='text-teal-600 font-bold'>Satisfied Customer</p>
          </div>
        </div><div className='flex justify-center items-center border-[1px] border-teal-400 h-44 w-44'>
          <div className='text-center'>
            <p className='flex justify-center text-4xl text-teal-600'><AiFillLike /></p>
            <p className='text-4xl mt-4 font-bold'>380+</p>
            <p className='text-teal-600 font-bold'>Feedback</p>
          </div>
        </div><div className='flex justify-center items-center border-[1px] border-teal-400 h-44 w-44'>
          <div className='text-center'>
            <p className='flex justify-center text-4xl text-teal-600'><HiTemplate /></p>
            <p className='text-4xl mt-4 font-bold'>24+</p>
            <p className='text-teal-600 font-bold'>Items</p>
          </div>
        </div><div className='flex justify-center items-center border-[1px] border-teal-400 h-44 w-44'>
          <div className='text-center'>
            <p className='flex justify-center text-4xl text-teal-600'><CgDollar /></p>
            <p className='text-4xl mt-4 font-bold'>800K$+</p>
            <p className='text-teal-600 font-bold'>Revenues</p>
          </div>
        </div>

      </div>

      <h2 className="py-2 text-4xl text-center font-bold my-24">What our clients say</h2>
      <div className="md:flex justify-between px-10 items-center bg-teal-900 py-10  text-white">
        <div className="md:w-1/2 flex md:justify-start justify-center ">
          <img src="client.png" className='w-7/12 rounded-full' alt="" />

        </div>
        <div className="md:w-1/2 md:text-2xl order-last mt-4 text-justify">
          <p>"I'm not a fan of buying used cars, and I'm naturally skeptical of the process and those involved. BUT, I can honestly say that the experience of buying a used vehicle from Quality Cars - and dealing with Colin in particular - was excellent. He is professional, well-informed, conscientious and his follow through was perfect. I'm very satisfied and would not hesitate to recommend them or buy another vehicle from them."</p>
          <p className="text-orange-500 font-semibold">Mohidul Islam</p><span>Faunder</span>
        </div>

      </div>
      <div className='bg-red-300 font-bold mt-10 h-96 text-center'>
        Second extra section
      </div>

      {/* Review */}
      <div className='px-4'>
        <h1 className='text-4xl font-bold text-center  mt-20'>Review</h1>
        {reviews?.map(review =>

          <div key={review._id} className='bg-teal-300 my-3 p-4' >
            <div className='flex items-center'>
              <img className='w-10 h-10 rounded-full border-black border-2 p-1' src={user[0]?.photoURL} alt="" />
              <p className='ml-2 font-bold'>{user.displayName}</p>
              <p className='ml-2'>{review.ratings}</p>
            </div>
            <p>{review.review}</p>
          </div>)}
      </div>
    </div>
  )
}

export default Home
