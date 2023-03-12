import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import auth from '../Authentication/firebase.init'
import { toast } from 'react-toastify';

const Profile = () => {


  const userEmail = useAuthState(auth)[0].email
  const displayName = useAuthState(auth)[0].displayName
  const photoURL = useAuthState(auth)[0].photoURL




  const { isLoading, data: user, refetch } = useQuery(['user'], () =>
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

        education: e.target.education.value,
        location: e.target.location.value,
        phnNumber: e.target.phnNumber.value,
        socialMedia: e.target.socialMedia.value

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

  if (isLoading) return <p>Loading..</p>

  return (
    <div>
      <img className='w-10 h-10 rounded-full border-black border-2 p-1' src={photoURL} alt="" />
      <p>Name:</p>
      <p className='font-bold'>{displayName}</p>
      <p>Email:</p>
      <p className='font-bold'>{userEmail}</p>
      <p>Location:</p>
      <p className='font-bold'>{user.location}</p>
      <p>Education:</p>
      <p className='font-bold'>{user.education}</p>
      <p>Phone number:</p>
      <p className='font-bold'>{user.phnNumber}</p>
      <p>Facebook Link:</p>
      <a className='font-bold' href={user.socialMedia}> <p>{user.socialMedia}</p></a>




      <button className="border-2 border-black rounded px-2 py-1 mt-4"><label htmlFor="my-modal" >Update Profile</label></button>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center">Update Your Profile</h3>
          <div className="modal-action justify-center">

            <form onSubmit={handleProfile}>
              <label htmlFor="education">Education</label> <br />
              <input type="text" className='border-2 border-black rounded px-4 w-96 h-12' name='education' id='education' defaultValue={user.education} /> <br />
              <label htmlFor="location">Location</label> <br />
              <input type="text" className='border-2 border-black rounded px-4 w-96 h-12' name='location' id='location' defaultValue={user.location} /> <br />
              <label htmlFor="phnNumber">Phone Number</label> <br />
              <input type="text" className='border-2 border-black rounded px-4 w-96 h-12' name='phnNumber' id='phnNumber' defaultValue={user.phnNumber} /> <br />
              <label htmlFor="socialMedia">Social Media link</label> <br />
              <input type="url" className='border-2 border-black rounded px-4 w-96 h-12' name='socialMedia' id='socialMedia' defaultValue={user.socialMedia} /> <br />
              <div className='flex justify-center mt-4'>
                <button type='submit'>
                  <label htmlFor="my-modal" className="border-2 border-black rounded px-4 py-2">Submit</label>
                </button>

                <label className="border-2 border-black rounded px-4 py-1 ml-3" htmlFor="my-modal" >Cancel</label>


              </div>
            </form>


          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile