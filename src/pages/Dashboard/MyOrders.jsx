import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import auth from '../Authentication/firebase.init';

const MyOrders = () => {

  const [user, loading] = useAuthState(auth);
  // console.log(user)
  const { data: myOrders, isLoading, refetch } = useQuery(['myOrders',user], () => fetch(`https://tools-house.onrender.com/myOrders/${user.email}`, {
    method: 'GET',
    headers:{
      authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
  }).then(res => res.json()))

  const handleDelete = (id) => {
    fetch(`https://tools-house.onrender.com/deleteOrder/${id}`, {
      method: 'DELETE',
      headers:{
        authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    }).then(res => res.json())
      .then(data => {
        if (data.deletedCount) { 
          refetch()
        }
      })
  }

  if (isLoading) {
    return <div classNamel=' flex justify-center font-bold text-3xl pt-20 min-h-screen -mt-24'><Spinner /></div>
  }
  console.log(myOrders)
  return (
    <div>{myOrders?.map(order => <div className='border-2 border-teal-600 my-3 p-3
    ' key={order._id}>
      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <img className='w-14 h-14 border-2 border-teal-600 rounded-full p-2' src={order.item.img} alt="" />
          <p className='ml-4'>Name: <span className='font-bold'>{order.item.name}</span></p>
          <p className='ml-4'>Qnt: <span className='font-bold'>{order.orderQuantity}</span></p>

        </div>
        <div className=''>
          {order.paid ? <div className=' text-green-800'>
            <p className='font-bold'>Successfully paid !!</p>
            <p className='font-bold'> Transaction Id : {order.transactionId}</p>
          </div> : <div>

            <Link to={`/payment/${order._id}`}><button className='btn'> Pay</button></Link>
            {/* The button to open modal */}
            <label htmlFor="my-modal" className="btn ml-4">Delete</label>

            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg text-center">Are you sure to delete this order ?</h3>
                <div className="modal-action justify-center">
                  <label onClick={() => handleDelete(order._id)} htmlFor="my-modal" className="btn">Yes</label>
                  <label htmlFor="my-modal" className="btn">No</label>
                </div>
              </div>
            </div>
          </div>}

        </div>
      </div>

    </div>)}

    </div>
  )
}

export default MyOrders