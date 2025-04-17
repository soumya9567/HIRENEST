import React, { useContext, useRef } from 'react';
import { AppContext } from '../Context/AppContext';

function Header() {
  const { setSearchFilter, setIsSearched } = useContext(AppContext);

  const titleRef = useRef(null);
  const locationRef = useRef(null);

  const onSearch = () => {
    setSearchFilter({
      title: titleRef.current.value,
      location: locationRef.current.value
    });
    setIsSearched(true);

    console.log({
      title: titleRef.current.value,
      location: locationRef.current.value
    });
  };

  return (
    <div className=" py-6 sm:py-6 flex flex-col items-center justify-center h-[400px] sm:h-[500px]">
      <div className="text-center max-w-3xl w-full">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black mb-4 drop-shadow-lg">
          Find Your Dream Job
        </h1>
        <p className="text-lg sm:text-xl font-medium text-[#D5DBDB] mb-6 sm:mb-10">
          5 Lakh+ jobs waiting for you to explore
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <input
            type="text"
            className="px-6 py-3 w-72 sm:w-80 md:w-[400px] text-lg rounded-xl shadow-2xl focus:outline-none text-black placeholder:text-gray-500 bg-transparent border border-white"
            placeholder="Search jobs, companies, or skills..."
            ref={titleRef}
          />
          <input
            type="text"
            className="px-6 py-3 w-72 sm:w-80 md:w-[300px] text-lg rounded-xl shadow-2xl focus:outline-none text-black placeholder:text-gray-500 bg-transparent border border-white"
            placeholder="Enter location"
            ref={locationRef}
          />
          <button
            onClick={onSearch}
            className="px-6 py-3 bg-[#FF5733] text-white font-bold rounded-xl border-b-gray-700 transition-transform transform hover:bg-[#E74C3C] hover:scale-105"
          >
            Search Jobs
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
