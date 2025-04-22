import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';
import { assets, jobsData } from '../assets/assets';
import Navbar from '../Components/Navbar';
import moment from 'moment';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';

function ApplyJob() {
    const { id } = useParams();
    const { getToken } = useAuth()

    const navigate = useNavigate()// Get the job id from URL params
    const [JobData, setJobData] = useState(null);

    const [ isAlreadyApplied,setIsAlreadyApplied]  = useState(false)
    const { jobs, backendUrl, userData, userApplications,fetchUserApplications } = useContext(AppContext);

    const fetchJob = async () => {

        try {

            const { data } = await axios.get(backendUrl + `/api/jobs/${id}`)

            if (data.success) {
                setJobData(data.job)
            } else {
                toast.error(data.message)
            }

        } catch (error) {

            toast.error(error.message)

        }


    };


    const applyHandler = async () => {
        try {
          if (!userData) {
            return toast.error('Login to apply for job');
          }
      
          if (!userData.resume) {
            navigate('/applications');
            return toast.error('Upload resume to apply');
          }
      
          const token = await getToken();
      
          const { data } = await axios.post(
            backendUrl + '/api/users/apply',
            { jobId: JobData._id },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
      
          if (data.success) {
            toast.success(data.message);
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          toast.error(error?.response?.data?.message || error.message || 'Something went wrong');
        }
      };



      const checkAlreadyApplied = () => {
        const hasApplied = userApplications.some(item => item.jobId._id === JobData._id);
        setIsAlreadyApplied(hasApplied);
      };
      
      useEffect(() => {
        if (userApplications.length > 0 && JobData) {
          checkAlreadyApplied();
        }
      }, [JobData, userApplications, id]);
      

    useEffect(() => {

        fetchJob()

    }, [id]);

    useEffect(()=>{

        if (userApplications.length > 0 && JobData) {

            checkAlreadyApplied()
            
        }
    },[JobData,userApplications,id])

    return JobData ? (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-5xl mx-auto px-4 py-10">
                <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col md:flex-row gap-8">
                    <div className="flex-shrink-0 flex justify-center items-start">
                        <img
                            src={JobData.companyId.image}
                            alt=""
                            className="w-28 h-28 object-cover rounded-xl border"
                        />
                    </div>

                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">
                            {JobData.title}
                        </h1>
                        <div className="flex flex-wrap gap-4 text-gray-600 text-sm mb-6">
                            {/* Job Details */}
                            <span className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-lg">
                                <img src={assets.suitcase_icon} alt="" className="w-4 h-4" />
                                {JobData.companyId.name}
                            </span>
                            <span className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-lg">
                                <img src={assets.location_icon} alt="" className="w-4 h-4" />
                                {JobData.location}
                            </span>
                            <span className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-lg">
                                <img src={assets.person_icon} alt="" className="w-4 h-4" />
                                {JobData.level}
                            </span>
                            <span className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-lg">
                                <img src={assets.money_icon} alt="" className="w-4 h-4" />
                                CTC: {JobData.salary}
                            </span>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <button onClick={applyHandler} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition duration-300">
                               {isAlreadyApplied ? 'Already Applied' : 'Apply Now'}
                            </button>
                            <p className="text-gray-500 text-sm">
                                Posted {moment(JobData.date).fromNow()}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Job Description Section */}
                <div className="bg-white mt-10 p-6 rounded-2xl shadow-md">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
                        Job Description
                    </h2>

                    <div
                        className="prose prose-sm sm:prose-base max-w-none text-gray-700 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: JobData.description }}
                    ></div>

                    <div className="mt-8 flex justify-start">
                        <button onClick={applyHandler} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition duration-300">
                        {isAlreadyApplied ? 'Already Applied' : 'Apply Now'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <p className="text-gray-500">Loading job details...</p>
        </div>
    );

}

export default ApplyJob;
