import { useQuery } from '@tanstack/react-query'
import React from 'react'

const ManageProducts = () => {

  const { isLoading, data: allTools, refetch } = useQuery(['allTools'], () =>
    fetch(`https://tools-house.onrender.com/tools`, {
      method: 'GET',
      headers: {
        'authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
    })
      .then(res => res.json())
  )
  const handleDelete = (id) => {
    fetch(`https://tools-house.onrender.com/deleteTool/${id}`, {
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
  if (isLoading) return <p>Loading........</p>
  console.log(allTools)
  return (
    <div className='pr-2'>
      <div className='flex justify-between items-center px-4 py-2 rounded border-[1px] border-teal-600 mt-2'>
        <p className='w-24 text-start'>Img</p>
        <p className='w-24 text-start'>Name</p>
        <p className='w-24 text-start'>Price</p>
        <p className='w-24 text-center'>X</p>

      </div>
      {allTools.map(tool => <div key={tool._id} className='flex justify-between items-center px-4 py-2 rounded border-[1px] border-teal-600 mt-2'>
       <div className='w-24 '> <img className='h-14 w-14 rounded-full p-2 border-[1px] border-teal-700' src={tool.img} alt="" /></div>
        <p className='w-24 text-start'>{tool.name}</p>
        <p className='w-24 text-start'>$ {tool.price}</p>
        <p className='w-24 text-red-500 border-[1px] py-1 rounded text-center border-red-500 first-letter:' onClick={() => handleDelete(tool._id)}>Delete</p>
      </div>)}
    </div>
  )
}

export default ManageProducts