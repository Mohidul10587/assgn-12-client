import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import auth from '../Authentication/firebase.init';

const ManageAllOrders = () => {

  const [user, loading] = useAuthState(auth);
  // console.log(user)
  const { data: myOrders, isLoading, refetch } = useQuery(['myOrders', user], () => fetch(`https://tools-house.onrender.com/allOrders`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
  }).then(res => res.json()))

  const handleDelete = (id) => {
    fetch(`https://tools-house.onrender.com/deleteOrder/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    }).then(res => res.json())
      .then(data => {
        if (data.deletedCount) {
          refetch()
        }
      })
  }



  const updateStatus = (id) => {
    fetch(`https://tools-house.onrender.com/updatePendingToShiped/${id}`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    }).then(res => res.json())
      .then(data => {
        if (data.modifiedCount == 1) {
          refetch()
        }
      })
  }
  
  if (isLoading) {
    return <div className=' flex justify-center font-bold text-3xl min-h-screen -mt-24 items-center'><Spinner /></div>
  
  }

  return (
    <div>{myOrders?.map(order => <div className='border-2 border-teal-600 m-3 p-3
    ' key={order._id}>
      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <img className='w-14 h-14 border-2 border-teal-600 rounded-full p-2' src={order.item.img} alt="" />
          <p className='ml-4'>Name: <span className='font-bold'>{order.item.name}</span></p>
          <p className='ml-4'>Qnt: <span className='font-bold'>{order.orderQuantity}</span></p>
          <p className='ml-4'>status: <span className='font-bold'>{order.status}</span></p>
        </div>
        <div className=''>
          {order.paid ? <div className=' text-green-800'>

            {order.status !== 'Shipped' && <button onClick={() => { updateStatus(order._id) }} className='btn'>Shift</button>}


          </div> : <div>
     
            <label htmlFor="my-modal" className="btn ml-4">Delete</label>
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

export default ManageAllOrders
