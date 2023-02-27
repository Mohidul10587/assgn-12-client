import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import auth from '../Authentication/firebase.init'
import { toast } from 'react-toastify';

const Profile = () => {

  
  const userEmail = useAuthState(auth)[0].email
  const displayName = useAuthState(auth)[0].displayName
  const photoURL = useAuthState(auth)[0].photoURL




  const { isLoading, data: user ,refetch} = useQuery(['user'], () =>
    fetch(`http://localhost:5000/singleUser/${userEmail}`, {
      method: 'GET',
      headers: {
        'authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
    })
      .then(res => res.json())
  )







  const handleProfile = (e) => {
    e.preventDefault()
   



    fetch(`http://localhost:5000/user/update/${userEmail}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify({
        
          education:e.target.education.value,
          location:e.target.location.value,
          phnNumber:e.target.phnNumber.value
        
      })
    }).then(res => {
      if (res.status === 403) {
        toast.error('Failed to update')
      }
      return res.json()
    })
      .then(data => {
        if (data.modifiedCount > 0) {
          toast.success('Successfully updated user information')
          refetch()
        }

      })

  }

if(isLoading)return <p>Loading..</p>

  return (
    <div> <img className='w-10 h-10 rounded-full border-black border-2 p-1' src={photoURL} alt="" />
      <p className='ml-2 font-bold'>{displayName}</p>
      <p>{userEmail}</p>
      <p>{user.location}</p>
      <p>{user.education}</p>
      <p>{user.phnNumber}</p>


      <label htmlFor="my-modal" className="btn ml-4">Edit Profile</label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center">Update Your Profile</h3>
          <div className="modal-action justify-center">

            <form onSubmit={handleProfile}>
              <label htmlFor="education">Education</label> <br />
              <input type="text" className='border-2 border-black rounded' name='education' id='education' /> <br />
              <label htmlFor="location">Location</label> <br />
              <input type="text" className='border-2 border-black rounded' name='location' id='location' /> <br />
              <label htmlFor="phnNumber">Phone Number</label> <br />
              <input type="text" className='border-2 border-black rounded' name='phnNumber' id='phnNumber' /> <br />
              <div className='flex justify-between mt-4'>
                <button type='submit'>
                  <label htmlFor="my-modal" className="btn">Submit</label>
                </button>
                  <label htmlFor="my-modal" className="btn">Cancel</label>
              </div>
            </form>


          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile