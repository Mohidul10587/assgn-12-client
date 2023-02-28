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
  return (
    <div>
      {allTools.map(tool => <div key={tool._id} >
        <p>{tool.name}</p>
        <button onClick={()=>handleDelete(tool._id)} className='btn'>Delete</button>
      </div>)}
    </div>
  )
}

export default ManageProducts