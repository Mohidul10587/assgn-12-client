import React from 'react'
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/Spinner';
import { useState } from 'react';
import auth from './Authentication/firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';

const BuyNow = () => {


  const [user, loading] = useAuthState(auth);
  const [error, setError] = useState(' ')

  // const [displayProduct, setDisplayProduct] = useState(true)
  const query = useParams()
  const id = query.id;
  const { data: item, isLoading } = useQuery(['item'], () => fetch(`https://tools-house.onrender.com/tools/${id}`, {
    method: 'GET',
  }).then(res => res.json()))



  const handleSubmit = (e) => {
    e.preventDefault()
    const orderQuantity = e.target.quantity.value
    const phoneNo = e.target.phoneNo.value
    const address = e.target.address.value

    if (orderQuantity < parseInt(item.minOrderQuantity)) {
      setError('Order quantity is less than  minimum order quantity')
    }
    else if (orderQuantity > parseInt(item.quantity)) {
      setError('Order quantity is more than  stock quantity')
    }
    else {

      fetch('https://tools-house.onrender.com/order', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({
          email: user.email,
          item,
          orderQuantity,
          phoneNo,
          address,
          status: 'Unpaid'

        })
      })
        .then(res => res.json())
        .then((data) => {
          if (data.acknowledged) {
            toast.success('Your order submitted successfully')
            e.target.quantity.value = ''
            e.target.phoneNo.value = ''
            e.target.address.value = ''
          } else {
            toast.error('Sorry your order does not placed. Please try again')
          }
        })
    }



  }





  if (isLoading) {
    return <div className=' flex justify-center font-bold text-3xl pt-20 min-h-screen'><Spinner /></div>
  }

  return (
    <div className=' pt-24 min-h-screen px-4'>
      {/* <button className='btn mb-4' onClick={() => setDisplayProduct(true)}> Product details</button> */}
      <div className='md:flex justify-between'>
        <div className='md:w-1/2 border-2 md:border-r-0 border-teal-600 overflow-hidden md:rounded-l-lg rounded-l-none'>
          <img className='w-full h-60 border-b-2 border-teal-600' src={item.img} alt="" />
          <div className='p-3'>
            <p>User name :{user?.displayName}</p>
            <p>User Email :{user?.email}</p>

            <p className='font-bold mt-3 text-xl'>{item.name}</p>
            <p className='font-bold'>Price: {item.price} TK</p>
            <p className='font-bold'>Description:</p>
            <p className='text-justify h-32 overflow-y-scroll py-2'>{item.description}</p>
            <p className='font-bold'>Available quantity :{item.quantity}</p>
            <p className='font-bold'>Minimum order quantity:{item.minOrderQuantity}</p>
          </div>

        </div>

        <div className='md:w-1/2 border-2 border-teal-600 p-4 flex justify-center  items-center md:mt-0 mt-4 rounded-lg md:rounded-l-none md:rounded-r-lg'>
          <div>
            <h1 className='text-center font-bold text-3xl'>Place Order</h1>
            <form onSubmit={handleSubmit} className='mt-4' name='order-form'>

              <label htmlFor="quantity" className='font-bold'>Quantity</label> <br />
              <input name='quantity' id='quantity' className='rounded-md  px-2 border-2 border-black md:w-96 w-64' type="number" required /> <br />
              <p className='text-red-500 mb-2'>{error}</p>
              <label htmlFor="phoneNo" className='font-bold'>Phone No</label> <br />
              <input name='phoneNo' id='phoneNo' className='rounded-md mb-2 px-2 border-2 border-black md:w-96 w-64' type="tel" required /> <br />
              <label htmlFor="address" className='font-bold'>Delivery Address</label> <br />
              <textarea name='address' id='address' className='rounded-md mb-2 px-2 border-2 border-black md:w-96 w-64' type="text" required /> <br />
              <div className='text-center'>
                <button type="submit" className='mt-4 bg-teal-600 text-white font-bold border-teal-900 border-2 rounded-md py-1 px-3'>Place Order</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BuyNow