import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const JobCard = ({ job }) => {
const navigate = useNavigate()

  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 flex flex-col gap-4 w-full">
      <div className="flex items-center justify-start">
        <img src={job.companyId.image} alt="Company Icon" className="w-12 h-12 object-contain" />
      </div>

      <h4 className="text-xl font-semibold text-gray-800">{job.title}</h4>

      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
        <span className="bg-gray-100 px-3 py-1 rounded">{job.location}</span>
        <span className="bg-gray-100 px-3 py-1 rounded">{job.level}</span>
      </div>

     

      <p  className="text-gray-600 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: job.description.slice(0, 200) }} />


      <div className="flex flex-wrap gap-4 mt-auto">
        <button onClick={() => {navigate(`/apply-job/${job._id}`);scrollTo(0,0)}} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
          Apply Now
        </button>
        <button   onClick={() => {navigate(`/apply-job/${job._id}`);scrollTo(0,0)}} className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg text-sm">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default JobCard;
