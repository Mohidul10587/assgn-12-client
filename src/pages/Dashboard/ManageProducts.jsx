import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify';
import React from 'react'
import Spinner from '../../components/Spinner';

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
  if (isLoading) return <div className=' flex justify-center items-center font-bold text-3xl pt-20 min-h-screen -mt-24'><Spinner /></div>
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

        <button className="border-2 border-black rounded px-2 py-1 mt-4"><label htmlFor="my-modal" >Delete</label></button>

        {/* Put this part before </body> tag */}
        <input type="checkbox" id="my-modal" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-center">Are you sure to delete ?</h3>
            <div className="modal-action justify-center">

            <div className='flex justify-center mt-4'>
                    <label onClick={()=>handleDelete(tool._id)} htmlFor="my-modal" className="border-2 border-black rounded px-4 py-1">Yes</label>
                  <label className="border-2 border-black rounded px-4 py-1 ml-3" htmlFor="my-modal" >No</label>
                </div>
            </div>
          </div>
        </div>
      </div>)}
    </div>
  )
}

export default ManageProducts