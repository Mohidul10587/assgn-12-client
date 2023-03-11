import { useQuery } from '@tanstack/react-query'
import React from 'react'

const ManageProducts = () => {

  const { isLoading, data: allTools, refetch } = useQuery(['allTools'], () =>
    fetch(`http://localhost:5000/tools`, {
      method: 'GET',
      headers: {
        'authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
    })
      .then(res => res.json())
  )
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/deleteTool/${id}`, {
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
    <div>
      {allTools.map(tool => <div key={tool._id} className='flex justify-between items-center px-4 py-2 rounded border-[1px] border-teal-600 mt-2'>
        <img className='h-16 w-16 rounded-full' src={tool.img} alt="" />
        <p>{tool.name}</p>
        <p>{tool.price}</p>
        <p>{tool.name}</p>
        <p>{tool.name}</p>

        <button onClick={() => handleDelete(tool._id)} className='btn'>Delete</button>
      </div>)}
    </div>
  )
}

export default ManageProducts