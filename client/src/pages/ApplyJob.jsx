import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';
import { assets } from '../assets/assets';
import Navbar from '../Components/Navbar';
import moment from 'moment';

function ApplyJob() {
    const { id } = useParams();
    const [JobData, setJobData] = useState(null);
    const { jobs } = useContext(AppContext);

    const fetchJob = async () => {
        const data = jobs.filter(job => job._id === id);
        if (data.length !== 0) {
            setJobData(data[0]);
            console.log(data[0]);
        }
    };

    useEffect(() => {
        if (jobs.length > 0) {
            fetchJob();
        }
    }, [id, jobs]);

    return JobData ? (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-5xl mx-auto px-4 py-10">
                {/* Top Job Card */}
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
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition duration-300">
                                Apply Now
                            </button>
                            <p className="text-gray-500 text-sm">
                                Posted {moment(JobData.data).fromNow()}
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
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition duration-300">
                            Apply Now
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
