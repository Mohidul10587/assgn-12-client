import React from 'react'
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/Spinner';
import { useState } from 'react';
import auth from './Authentication/firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';

const BuyNow = () => {


  const [user, loading] = useAuthState(auth);

  const [displayProduct, setDisplayProduct] = useState(false)
  const query = useParams()
  const id = query.id;
  const { data: item, isLoading } = useQuery(['item'], () => fetch(`http://localhost:5000/tools/${id}`, {
    method: 'GET',
  }).then(res => res.json()))


  const handleSubmit = (e) => {
    e.preventDefault()
    const orderQuantity = e.target.quantity.value
    if (orderQuantity < item.minOrderQuantity || orderQuantity > item.quantity) {
      console.log('impossible')
    }
    else {

      fetch('http://localhost:5000/order', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',

        },
        body: JSON.stringify({
          item,
          quantity: orderQuantity,

        })
      })
        .then(res => res.json())
        .then(() => {

          alert('ok')
          
        })
    }



  }





  if (isLoading) {
    return <div className=' flex justify-center font-bold text-3xl pt-20 min-h-screen'><Spinner /></div>
  }

  return (
    <div className='pt-24 min-h-screen px-4'>
      <button className='btn mb-4' onClick={() => setDisplayProduct(true)}> Product details</button>
      {
        displayProduct && <div className=' border-2 border-teal-600 overflow-hidden rounded-lg w-full'>
          <img className='w-full h-60 border-b-2 border-teal-600' src={item.img} alt="" />
          <div className='p-3'>
            <p>User name :{user?.displayName}</p>
            <p>User Email :{user?.email}</p>

            <p className='font-bold mt-3 text-xl'>{item.name}</p>
            <p>Price: {item.price} TK</p>
            <p className='text-justify h-32 overflow-y-scroll py-2'>{item.description}</p>
            <p>Available quantity :{item.quantity}</p>
            <p>Minimum order quantity:{item.minOrderQuantity}</p>
            <Link to={`/buy/${item._id}`}><button className=' text-white  rounded-md px-4 mt-2 py-2 bg-teal-700'>Buy Now</button></Link>

          </div>

        </div>
      }
      <form onSubmit={handleSubmit}>
        <input name='quantity' defaultValue={item.minOrderQuantity} type="number" />
        <button type="submit">Place Order</button>
      </form>
    </div>
  )
}

export default BuyNow