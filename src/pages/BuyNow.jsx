import React from 'react'
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/Spinner';
import { useState } from 'react';
import auth from './Authentication/firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';

const BuyNow = () => {


  const [user, loading] = useAuthState(auth);


  // const [displayProduct, setDisplayProduct] = useState(true)
  const query = useParams()
  const id = query.id;
  const { data: item, isLoading } = useQuery(['item'], () => fetch(`http://localhost:5000/tools/${id}`, {
    method: 'GET',
  }).then(res => res.json()))



  const handleSubmit = (e) => {
    e.preventDefault()
    const orderQuantity = e.target.quantity.value
    if (orderQuantity < parseInt(item.minOrderQuantity) || orderQuantity > parseInt(item.quantity)) {
      console.log('impossible')
    }
    else {

      fetch('http://localhost:5000/order', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',

        },
        body: JSON.stringify({
          email: user.email,
          item,
          quantity: orderQuantity,

        })
      })
        .then(res => res.json())
        .then(() => {

          alert(orderQuantity)

        })
    }



  }





  if (isLoading) {
    return <div className=' flex justify-center font-bold text-3xl pt-20 min-h-screen'><Spinner /></div>
  }

  return (
    <div className=' pt-24 min-h-screen px-4'>
      {/* <button className='btn mb-4' onClick={() => setDisplayProduct(true)}> Product details</button> */}
      <div className='flex justify-between'>
        <div className='w-1/2 border-2 border-r-0 border-teal-600 overflow-hidden rounded-l-lg'>
            <img className='w-full h-60 border-b-2 border-teal-600' src={item.img} alt="" />
            <div className='p-3'>
              <p>User name :{user?.displayName}</p>
              <p>User Email :{user?.email}</p>

              <p className='font-bold mt-3 text-xl'>{item.name}</p>
              <p>Price: {item.price} TK</p>
              <p className='text-justify h-32 overflow-y-scroll py-2'>{item.description}</p>
              <p>Available quantity :{item.quantity}</p>
              <p>Minimum order quantity:{item.minOrderQuantity}</p>

            </div>

          </div>
        
        <div className='w-1/2 border-2 border-teal-600 p-4 flex justify-center  items-center'>
         <div>
         <h1 className='text-center font-bold text-3xl'>Place Order</h1>
          <form onSubmit={handleSubmit} className='mt-4'>
            <label htmlFor="quantity" className='font-bold'>Quantity</label> <br />
            <input name='quantity' id='quantity' className='rounded-md mt-2 px-2 border-2 border-black'  type="number" /> <br />
            <button type="submit" className='mt-4 bg-teal-600 text-white font-bold border-teal-900 border-2 rounded-md py-1 px-3'>Place Order</button>
          </form>
         </div>
        </div>
      </div>
    </div>
  )
}

export default BuyNow