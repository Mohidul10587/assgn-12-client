import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../Authentication/firebase.init';

const MyOrders = () => {

  const [user, loading] = useAuthState(auth);

  const { data: myOrders, isLoading, refetch } = useQuery(['myOrders'], () => fetch(`http://localhost:5000/myOrders/${user.email}`, {
    method: 'GET',
  }).then(res => res.json()))


  const handleDelete = (id) => {

    fetch(`http://localhost:5000/deleteOrder/${id}`, {
      method: 'DELETE',

    }).then(res => res.json())
      .then(data => {

        if (data.deletedCount) {


          refetch()
        }
      })
  }


  if (isLoading) {
    return <p>loading</p>
  }
  console.log(myOrders)
  return (
    <div>{myOrders.map(order => <div className='border-2 border-teal-600 my-3 p-3
    ' key={order._id}>
      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <img className='w-14 h-14 border-2 border-teal-600 rounded-full p-2' src={order.item.img} alt="" />
          <p className='ml-4 font-bold'>{order.item.name}</p>
          <p className='ml-4 font-bold'>{order.quantity}</p>

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
                <label onClick={() => handleDelete(order._id)}  htmlFor="my-modal" className="btn">Yes</label>
                <label   htmlFor="my-modal" className="btn">No</label>
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