// /components/Navbar.js
import React, { useContext, useEffect, useState } from 'react';
import { useClerk, UserButton, useUser, useAuth } from '@clerk/clerk-react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';
import portalicon from "../assets/portalicon.png"
import axios from "axios"

function Navbar() {
  const { openSignIn } = useClerk();
  const { user } = useUser();  
  const { getToken } = useAuth();  
  const navigate = useNavigate();
  const { setShowRecruiterLogin } = useContext(AppContext);
  const[role,setRole]=useState("")

  useEffect(() => {
    if (user) {
      register(); 
    }
  }, [user]);

   
  const handleLogin = async () => {
    await openSignIn()
    
  
  

    
    
  };
  const register = async () => {
    try {
      if (!user) {
        console.warn("No user found");
        return;
      }
  
      const token = await getToken();
      if (!token) {
        console.error("No token available after authentication");
        return;
      }
  
      console.log("User:", user);
      console.log("Token:", token);
      console.log("Role:", role);

        
        const requestData = {
          userData: {
            clerkId: user.id,
            email: user.primaryEmailAddress.emailAddress,
             name: `${user.firstName} ${user.lastName}`,
             resume: user.resume,
            image: user.imageUrl,
          }
        };
        console.log('Sending this data to backend:', requestData);
  
      const response = await axios.post(
        'http://localhost:3000/api/users/store-user',
        {
          clerkId: user.id,
          name: `${user.firstName} ${user.lastName}`,
          email: user.primaryEmailAddress.emailAddress,
          image: user.imageUrl,
          role: role,        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
  
      console.log("User successfully registered:", response.data);
    } catch (error) {
      console.error("Error during registration:", error.response?.data || error.message || error);
    }
  };
  
  

  return (
    <div className="bg-orange-500 shadow py-2">
      <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center">
        <img onClick={() => navigate('/')} src={portalicon} width={80} alt="Portal Icon" />

        {user ? (
          <div className="flex items-center gap-4">
            <Link to={'/applications'} className="text-white text-sm hover:underline">
              Applied Jobs
            </Link>
            <p className="text-white text-sm">
              Hi, {user.firstName} {user.lastName}
            </p>
            <UserButton />
          </div>
        ) : (
          <div className="flex gap-4 max-sm:text-xs">
            <button onClick={() => setShowRecruiterLogin(true)} className="text-white text-sm hover:underline">
              Recruiter Login
            </button>
            <button
              onClick={()=>{
                handleLogin()
                setRole("candidate")
              }} 
              className="bg-blue-600 text-white px-4 sm:px-6 py-1 rounded-full text-sm hover:bg-blue-700"
            >
              CLogin
            </button>

            <button
               onClick={()=>{
                handleLogin()
                setRole("recruiter")
              }} 
              className="bg-blue-600 text-white px-4 sm:px-6 py-1 rounded-full text-sm hover:bg-blue-700"
            >
              RLogin
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
