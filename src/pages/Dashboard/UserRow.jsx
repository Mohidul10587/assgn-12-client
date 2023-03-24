import React from 'react'
import { toast } from 'react-toastify';


const UserRow = ({ user, refetch }) => {
  const { email, roll } = user;

  const makeAdmin = () => {

    fetch(`https://tools-house.onrender.com/user/admin/${email}`, {
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

  const handleDelete = (email) => {

    fetch(`https://tools-house.onrender.com/deleteUser/${email}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }

    }).then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.deletedCount) {

          refetch()
        }
      })
  }
  return (
    <tr className='border-[1px] border-gray-800'>
      <td className='border-[1px] border-gray-800'>{email}</td>
      <td className='border-[1px] border-gray-800'>{roll !== 'admin' ?<button onClick={makeAdmin} className="btn btn-xs">Make Admin</button>: <p className='ml-5 font-bold'>Admin</p>} </td>
      <td className='border-[1px] border-gray-800'><button onClick={()=>handleDelete(email)} className="btn btn-xs">Remove User</button></td>

    </tr>
  )
}

export default UserRow