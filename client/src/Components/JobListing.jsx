import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../Context/AppContext';
import { assets, JobCategories, JobLocations, jobsData } from "../assets/assets";
import JobCard from './JobCard';
import { Link } from 'react-router-dom';

function JobListing() {
    const { isSearched, searchFilter, setSearchFilter,jobs } = useContext(AppContext);
    const [showFilter,setShowFilter] = useState(false)
    const [currentPage,setCurrentPage] = useState(1)
    const [selectedCategories,setSelectedCategories] = useState([])
    const [selectedLocations,setSelectedLocations] = useState([])
    const [filteredJobs,setFilteredJobs] = useState(jobs)

    const handleCategoryChange = (category) => {
        setSelectedCategories(
            prev => prev.includes(category) ? prev.filter(c => c !== category) :[...prev,category]
        )
    }

    const handleLocationChange = (location) => {
        setSelectedLocations(
            prev => prev.includes(location) ? prev.filter(c => c !== location) :[...prev,location]
        )
    }

    useEffect(()=>{
        const matchesCategory = job =>selectedCategories.length === 0 || selectedCategories.includes(job.category)

        const matchesLocation = job => selectedLocations.length === 0 ||selectedLocations.includes(job.location)

        const matchTitle = job => searchFilter.title === "" || job.title.toLowerCase().includes(searchFilter.title.toLowerCase())

        const matchSearchLocation = job =>searchFilter.location == "" || job.location.toLowerCase().includes(searchFilter.title.toLowerCase())

        const newFilteredJobs = jobs.slice().reverse().filter(

            job => matchesCategory(job) && matchesLocation(job) && matchTitle(job) &&  matchSearchLocation(job)
        )

        setFilteredJobs(newFilteredJobs)
        setCurrentPage(1)



    },[jobs,selectedCategories,selectedLocations,searchFilter])
   
    // console.log(jobsData,"data from job list")

    return (
        <div className='container mx-auto px-4 2xl:px-20 py-8 flex flex-col lg:flex-row gap-8'>
            <div className='w-full lg:w-1/4 bg-white px-4 py-6 rounded shadow-sm'>
                {
                    isSearched && (searchFilter.title !== "" || searchFilter.location !== "") && (
                        <>
                            <h3 className='font-medium text-lg mb-4'>Current Search</h3>
                            <div className="mb-4 text-gray-600 flex flex-wrap gap-2">
                                {searchFilter.title && (
                                    <span className='inline-flex items-center gap-2 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded'>
                                        {searchFilter.title}
                                        <img 
                                            onClick={() => setSearchFilter(prev => ({ ...prev, title: "" }))} 
                                            className='cursor-pointer w-4 h-4' 
                                            src={assets.cross_icon} 
                                            alt="remove title" 
                                        />
                                    </span>
                                )}
                                {searchFilter.location && (
                                    <span className='inline-flex items-center gap-2 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded'>
                                        {searchFilter.location}
                                        <img 
                                            onClick={() => setSearchFilter(prev => ({ ...prev, location: "" }))} 
                                            className='cursor-pointer w-4 h-4' 
                                            src={assets.cross_icon} 
                                            alt="remove location" 
                                        />
                                    </span>
                                )}
                            </div>
                        </>
                    )
                }

                <button onClick={e => setShowFilter(prev => !prev)} className='px-6 py-1.5 rounded border border-gray-400 lg:hidden'>
                    {showFilter ? "Close" : "Filter"}
                </button>

                {/* Categories Filter */}
                <div className={showFilter ? "" : "max-lg:hidden"}>
                    <h4 className='font-medium text-lg py-4'>Search by Categories</h4>
                    <ul className='space-y-3 text-gray-600'>
                        {
                            JobCategories.map((category, index) => (
                                <li className='flex items-center gap-3' key={index}>
                                    <label className='flex items-center gap-3 cursor-pointer'>
                                        <input onChange={() => handleCategoryChange(category)}
                                        checked = {selectedCategories.includes(category)}
                                         className='scale-125' 
                                         type="checkbox" />
                                        <span>{category}</span>
                                    </label>
                                </li>
                            ))
                        }
                    </ul>
                </div>

                {/* Locations Filter */}
                <div className={showFilter ? "" : "max-lg:hidden"}>
                    <h4 className='font-medium text-lg py-4 pt-14'>Search by Location</h4>
                    <ul className='space-y-3 text-gray-600'>
                        {
                            JobLocations.map((location, index) => (
                                <li className='flex items-center gap-3' key={index}>
                                    <label className='flex items-center gap-3 cursor-pointer'>
                                        <input onChange={() => handleLocationChange(location)}
                                        checked = {selectedLocations.includes(location)} className='scale-125' type="checkbox" />
                                        <span>{location}</span>
                                    </label>
                                </li>
                            ))
                        }
                    </ul>
                </div>


           
            </div>
                 {/*Job listing */}

                 <section className='w-full lg:3/4 text-grey-800 max-lg:px-4'>
                    <h3 className='font-medium text-3xl py-2 ' id='job-list'>Latest jobs</h3>
                    <p className='mb-8'>Get your desired job from top companies</p>
                    <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
                       {filteredJobs.slice((currentPage-1)*6,currentPage*6).map((job,index)=>(
                        <JobCard key={index} job={job}/>
                       ))}
                    </div>

                     {filteredJobs.length > 0 &&(
                        <div className='flex items-center justify-center space-x-2 mt-10'>
                            <a href='#job-list'>
                            <img onClick={() => setCurrentPage(Math.max(currentPage - 1),1)} src={assets.left_arrow_icon} alt="" />
                            </a>
                            {Array.from({length:Math.ceil(filteredJobs.length/6)}).map((_,index)=>(
                              <a key={index} href='#job-list'>
                                  <button onClick={()=> setCurrentPage(index+1)} className={`w-10 h-10 flex items-center justify-center border border-b-gray-300 rounded ${currentPage === index + 1 ? 'bg-blue-100 text-blue-500' : 'text-gray-500'}`}>{index + 1}</button>
                              </a>  
                            ))}
                              <a href='#job-list'>
                            <img onClick={() => setCurrentPage(Math.min(currentPage+1, Math.ceil(filteredJobs.length / 6)))} src={assets.right_arrow_icon} alt="" />
                            </a>
                        </div>
                     )}
                </section>

         
        </div>
    );
}

export default JobListing;
