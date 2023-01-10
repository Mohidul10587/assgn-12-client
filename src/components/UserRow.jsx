import React from 'react'
import { toast } from 'react-toastify';


const UserRow = ({ user, refetch }) => {
  const { email, roll } = user;

  const makeAdmin = () => {

    fetch(`https://mohid-shop.onrender.com/user/admin/${email}`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    }).then(res => {
      if (res.status === 403){
        toast.error('Failed to make an error')
      }
      return res.json()})
      .then(data => {
        if (data.modifiedCount > 0) {
          toast.success('Successfully added user as admin')
          refetch()
        }

      })
  }


  return (
    <tr className='border-[1px] border-pink-700'>
      <td className='border-[1px] border-pink-700'>{email}</td>
      <td className='border-[1px] border-pink-700'>{roll !== 'admin' ?<button onClick={makeAdmin} className="text-white rounded-md py-1 px-2 bg-pink-700">Make Admin</button>: <p className='ml-5 font-bold'>Admin</p>} </td>
      <td className='border-[1px] border-pink-700'><button className="text-white rounded-md py-1 px-2 bg-pink-700">Remove User</button></td>

    </tr>
  )
}

export default UserRow