import React from 'react'
import UserRow from '../components/UserRow';
import { useQuery } from '@tanstack/react-query';


const Users = () => {


  const { isLoading, data: users ,refetch} = useQuery(['users'], () =>
    fetch(`https://tools-house.onrender.com/user`, {
      method: 'GET',
      headers: {
        'authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
    })
      .then(res => res.json())
  )

  if (isLoading) return <p className='min-h-[600px]'>Loading</p>

  return (
    <div className='min-h-[600px]'>
    

      <div className="overflow-x-auto">
        <table className="table w-full">

          <thead className='border-[1px] border-teal-700'>
            <tr >
              <th className='border-[1px] border-teal-700 text-center text-base'>User Email</th>
              <th className='border-[1px] border-teal-700 text-center text-base'>User Roll</th>
              <th className='border-[1px] border-teal-700 text-center text-base'>Remove</th>


            </tr>
          </thead>
          <tbody>

            {users.map(user => <UserRow key={user._id} user={user} refetch={refetch}></UserRow>)}

          </tbody>
        </table>
      </div>
    </div>

  )
}


export default Users