import React from 'react'

const BuyNow = () => {
  const query = useParams()
  const id = query.id;
  const { data: items, isLoading } = useQuery(['items'], () => fetch(`http://localhost:5000/tools/${id}`, {
    method: 'GET',
  }).then(res => res.json()))

  if (isLoading) {
    return <div className=' flex justify-center font-bold text-3xl pt-20 min-h-screen'><Spinner /></div>
  }

  return (
    <div className='pt-20 min-h-screen'>
      


    </div>
  )
}

export default BuyNow