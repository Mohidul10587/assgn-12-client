import React from 'react'
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/Spinner';

const BuyNow = () => {

  const query = useParams()
  const id = query.id;
  const { data: item, isLoading } = useQuery(['item'], () => fetch(`http://localhost:5000/tools/${id}`, {
    method: 'GET',
  }).then(res => res.json()))

  if (isLoading) {
    return <div className=' flex justify-center font-bold text-3xl pt-20 min-h-screen'><Spinner /></div>
  }

  return (
    <div className='pt-20 min-h-screen'>
      
<p>{item.name}</p>

    </div>
  )
}

export default BuyNow