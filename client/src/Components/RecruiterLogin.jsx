import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import {AppContext} from "../Context/AppContext.jsx"

function RecruiterLogin() {
const [state,setState] = useState('Login')

const [name,setName] = useState('')

const[password,setPassword]  = useState('')

const [email, setEmail] = useState('')

const [image,setImage] = useState(false)

 
const [isTextDataSubmited,setIsTextDataSubmited] = useState(false)
const {setShowRecruiterLogin} = useContext(AppContext)

const onSubmitHandler = async (e) =>{
  e.preventDefault()

  if(state == "Sign Up" && !isTextDataSubmited){
    setIsTextDataSubmited(true)
  }
}

useEffect(()=>{
  document.body.style.overflow = 'hidden'

  return () =>{
    document.body.style.overflow = 'unset'


  }
})

  return (
    <div className='absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center  items-center'>
     <form onSubmit={onSubmitHandler} className='relative bg-white p-10 rounded-xl text-slate-500' action="">
        <h1 className='text-center text-2xl text-neutral-700 font-medium'>Recruiter {state}</h1>
        <p className='text-sm'>Welcome back ! please sign in to continue</p>
        {state === "Sign Up" && isTextDataSubmited
        ?<>


        </>
        :
        <>

        { state !== 'Login' && (
           <div className='border px-4 py-2 flex item-center gap-2 rounded-full mt-5'>
           <img src={assets.person_icon} alt="" />
           <input className='outline-none text-sm' type="text" onChange={e => setName(e.target.value)} placeholder='Company Name' value={name} name="" id=""   required/>
          </div>

        )}
          

           <div className='border px-4 py-2 flex item-center gap-2 rounded-full mt-5' >
           <img src={assets.email_icon} alt="" />
            <input className='outline-none text-sm' type="text" onChange={e => setEmail(e.target.value)} placeholder='Email' value={email} name="" id=""   required/>
            
           </div>

           <div className='border px-4 py-2 flex item-center gap-2 rounded-full mt-5'>   
            <img src={assets.lock_icon} alt="" />
            <input className='outline-none text-sm' type="text" onChange={e => setPassword(e.target.value)} placeholder='Password' name="" id=""  value={password}  required/>
           </div>
         {state === "Login" &&  <p className='text-sm text-blue-600 mt-4 cursor-pointer'>Forget Password</p>}
        </>
        
        }

        
        <button type='submit'  className='bg-blue-600 w-full text-white py-2 rounded-full mt-4'>
          {state == "Login" ? 'login' : 'create account'}
        </button>

        {
          state === 'Login'
          ?        <p className='mt-5 text-center'>Don't hanve an Account ? <span className='text-blue-600' onClick={() => setState("Sign Up")}>Sign Up</span></p>
          :         <p>Already have an account? <span className='text-blue-600' onClick={() => setState("Login")}>Login</span> </p>


        }

        <img onClick={e=> setShowRecruiterLogin(false)} className='absolute top-5 right-5 cursor-pointer' src={assets.cross_icon} alt="" />
          
     </form>
    </div>
  )
}

export default RecruiterLogin
