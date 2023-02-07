import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../Authentication/firebase.init';

const MyOrders = () => {

  const [user, loading] = useAuthState(auth);

  const { data: myOrders, isLoading ,refetch} = useQuery(['myOrders'], () => fetch(`http://localhost:5000/myOrders/${user.email}`, {
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
    <div>{myOrders.map(order => <div className='border-2 border-black my-3 p-3
    ' key={order._id}>
      <p>   {order.email}</p>
     {order.paid ? <button>Paid</button> : <Link to={`/payment/${order._id}`}><button className='btn'> Pay</button></Link>} 
   <button onClick={()=>handleDelete(order._id)} className='btn'>Delete</button>
   
    </div>)}

    </div>
  )
}

export default MyOrders