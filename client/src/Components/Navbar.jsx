import React, { useContext } from 'react'
import portalicon from "../assets/portalicon.png"
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../Context/AppContext'

function Navbar() {
  const { openSignIn } = useClerk()
  const { user } = useUser()


  const navigate = useNavigate()
  const {setShowRecruiterLogin}   = useContext(AppContext)


  return (
    <div className='bg-orange-500 shadow py-2'>
      <div className='container px-4 2xl:px-20 mx-auto flex justify-between items-center'>
        <img onClick={()=>navigate('/')} src={portalicon} width={80} alt="Portal Icon" />
        {user ? (
          <div className='flex items-center gap-4'>
            <Link to={'/applications'} className='text-white text-sm hover:underline'>Applied Jobs</Link>
            <p className='text-white text-sm'>Hi, {user.firstName} {user.lastName}</p>
            <UserButton />
          </div>
        ) : (
          <div className='flex gap-4 max-sm:text-xs'>
            <button  onClick={e =>setShowRecruiterLogin(true)} className='text-white text-sm hover:underline'>Recruiter Login</button>
            <button
              onClick={e => openSignIn()}
              className='bg-blue-600 text-white px-4 sm:px-6 py-1 rounded-full text-sm hover:bg-blue-700'
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
