import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth, useUser } from "@clerk/clerk-react";

export const AppContext = createContext();

export const AppContextProvider = (props) => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const {user} = useUser()

  const {getToken} = useAuth()


  const [searchFilter, setSearchFilter] = useState({
    title: '',
    location: ''
  });

  const [isSearched, setIsSearched] = useState(false);
  const [jobs, setJobs] = useState([])
  const [showRecruiterLogin, setShowRecruiterLogin] = useState(false)

  const [companyToken, setCompanyToken] = useState(null)

  const [companyData, setCompanyData] = useState(null)


  const [userData,setUserData]  = useState(null)

  const [userApplications,setUserApplications]  = useState([])

 
  const fetchJobs = async () => {

    try {

      const {data} = await axios.get(backendUrl + '/api/jobs')


      if (data.success) {

        setJobs(data.jobs)
        console.log(data.jobs,"kokokko")

        
      }else{
        toast.error(data.message)
      }
      
    } catch (error) {

      toast.error(error.message)
      
    }

    // setJobs(jobsData)
  }

  const fetchCompanyData = async () => {
    try {

      const { data } = await axios.get(backendUrl + '/api/company/company', { headers: { token: companyToken } })

      if (data.success) {

        setCompanyData(data.company)
        console.log(data)

      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)

    }
  }


  const fetchUserData = async () => {
    try {
      // Get the token (ensure that getToken() is implemented correctly)
      const token = await getToken();
      if (!token) {
        toast.error('No authentication token found');
        return;
      }
  
      // Fetch user data using clerkId (the backend should be expecting clerkId in the request)
      const { data } = await axios.get(backendUrl + '/api/users/user', {
        headers: { Authorization: `Bearer ${token}` },
        params: { clerkId: 'user_2v2hlWy7KqTM6G4XfClBZ8hFlVC' } // Example clerkId, use the actual one
      });
  
      if (data.success) {
        setUserData(data.user); // Store user data in state
      } else {
        toast.error(data.message); // Show error if user data isn't found or any other issue
      }
    } catch (error) {
      // Handle errors (network, token issues, etc.)
      toast.error(error.message || 'An error occurred');
    }
  };
  

  const fetchUserApplications = async() =>{

    try {

      const token = await getToken()


      const {data} = await axios.get(backendUrl +'/api/users/applications' ,

        {headers:{Authorization :`Bearer ${token}`}}
      )


      if (data.success) {
        setUserApplications(data.applications);
      } else {
        toast.error(data.message); 
      }
    } catch (error) {
      toast.error(error.message); 

    }
  }

  useEffect(() => {

    fetchJobs()



    const storedCompanyToken = localStorage.getItem('companyToken')

    if (storedCompanyToken) {


      setCompanyToken(storedCompanyToken)

    }
  }, [])


  useEffect(() => {

    if (companyToken) {
      fetchCompanyData()

    }

  }, [companyToken])


  useEffect(()=>{
    if (user) {

      fetchUserData()
      fetchUserApplications()
      
    }
  },[user])



  const value = {
    setSearchFilter,
    searchFilter,
    isSearched,
    setIsSearched,
    jobs, setJobs,
    showRecruiterLogin,
    setShowRecruiterLogin,
    companyToken,
    setCompanyToken, companyData, setCompanyData,
    backendUrl,userData,setUserData,setUserApplications,userApplications,
fetchUserData,fetchUserApplications
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};
