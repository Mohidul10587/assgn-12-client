import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../Authentication/firebase.init';


const MyReview = () => {

  const [user] = useAuthState(auth)
  const handleSubmit = (e) => {
    e.preventDefault()
    const review = e.target.review.value
    const ratings = e.target.ratings.value

    console.log(ratings, review)

    fetch('https://tools-house.onrender.com/review', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify({
        email: user.email,
        review,
        ratings

      })
    })
      .then(res => res.json())
      .then(() => {

        alert('orderQuantity')

      })

  }


  return (
    <div className='px-4'>


      <div className=' p-4 flex justify-center  items-center'>
        <div>
          <h1 className='text-center font-bold text-3xl'>Write a review</h1>
          <form onSubmit={handleSubmit} className='mt-4'>
            <label htmlFor="quantity" className='font-bold'>Review</label> <br />
            <input name='review' id='reviewDetails' className='rounded-md w-full px-2 border-2 border-black' type="text" required/> <br />
            <label htmlFor="quantity" className='font-bold'>Ratings</label> <br />
            <input name='ratings' id='ratings' className='rounded-md w-full px-2 border-2 border-black' type="number" required/>  <br />
            <button type="submit" className='mt-4 bg-teal-600 text-white font-bold border-teal-900 border-2 rounded-md py-1 px-3'>Place Review</button>
          </form>

        </div>
      </div>
    </div>
  )
}


export default MyReview