
import { signOut } from 'firebase/auth';
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate, } from 'react-router-dom'
import auth from '../pages/Authentication/firebase.init';





const Navbar = () => {




  const [dropdown, setDropdown] = useState(true)
  const [user] = useAuthState(auth)
  const navigate = useNavigate()

  const signedOut = () => {
    localStorage.removeItem('token');
    signOut(auth);
    navigate('/logIn');
  }
  window.onclick = function (event) {
    if (!event.target.matches('.sharebtn')) {
      setDropdown(true)

    }
  }
  return (

    <div className=''>

      <div className=' bg-teal-800 sm:h-20 h-14 fixed flex justify-between items-center z-30 w-full '>
        <Link className='md:w-1/3' to='/'> <p className=' font-bold py-2 text-white ml-4 sm:text-3xl text-xl'>LG </p></Link>
        {user ? <div className='md:flex hidden'>
          <Link to='/'> <p className='sm:mx-3 mx-1 my-3 px-3 font-bold text-white'> Home</p></Link>
          <Link to='/dashboard'> <p className='sm:mx-3 mx-1 my-3 px-3  font-bold text-white'> Dashboard</p></Link>
          <Link to='/payment'> <p className='sm:mx-3 mx-1 my-3 px-3  font-bold text-white'> Payment</p></Link>
          <Link to='/blog'> <p className='sm:mx-3 mx-1 my-3 px-3  font-bold text-white'> Blog</p></Link>
          <button className='sm:mx-3 mx-1  my-3 px-3  font-bold text-white' onClick={signedOut}> Log Out</button>
        </div> : <div className='md:flex hidden'>
          <Link to='/'> <p className='sm:mx-3 mx-1 my-3 px-3 font-bold text-white'> Home</p></Link>
          <Link to='/blog'> <p className='sm:mx-3 mx-1 my-3 px-3  font-bold text-white'> Blog</p></Link>
          <Link to="/login"><button className='sm:mx-3 mx-1 my-3 px-3  font-bold text-white' >Log In</button></Link>
        </div>}
        {/* sidebar for mobile  device */}
        <svg className="md:hidden sharebtn hover:border-white border-teal-800 mr-4 p-2" onClick={() => setDropdown(!dropdown)} width='32px' fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" /></svg>


        <div className={dropdown ? 'bg-teal-600  md:hidden fixed sm:top-24 top-14 w-64  text-white z-30 -right-64 transition-all duration-700 ' : ' bg-teal-600 md:hidden fixed sm:top-24 top-14 w-64 right-0 text-white z-30 transition-all duration-700'} >
          <Link to='/'>  <p onClick={() => setDropdown(true)} className=" border hover:border-white px-2 mx-2 border-teal-700  my-2 flex h-10 items-center ">Home</p></Link>
          {user ? <div>
            <Link to='/manageInventory'><p onClick={() => setDropdown(true)} className=" border hover:border-white px-2 mx-2 border-teal-700  my-2 flex h-10 items-center">Manage Inventory </p></Link>
            <Link to='/myItems'><p onClick={() => setDropdown(true)} className=" border hover:border-white px-2 mx-2 border-teal-700  my-2 flex h-10 items-center">My Items</p></Link>
            <Link to='/form'><p onClick={() => setDropdown(true)} className=" border hover:border-white px-2 mx-2 border-teal-700  my-2 flex h-10 items-center" >Add new item</p></Link>

            <button className='border hover:border-white px-2 mx-2 border-teal-700  my-2 flex h-10 items-center w-full' onClick={() => {
              signedOut()
              setDropdown(true)
            }}>Logout</button>
          </div> : <Link to="/login"><button className='border hover:border-white px-2 mx-2 border-teal-700  my-2 flex h-10 items-center w-full' >Login</button></Link>}





        </div>

      </div>
    </div>
  )
}




export default Navbar