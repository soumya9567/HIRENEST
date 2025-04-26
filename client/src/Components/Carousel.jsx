import React, { useState } from 'react';

// Import local images
import careerImg from '../assets/slide1.png';
import interviewImg from '../assets/slide2.png';
import officeImg from '../assets/slide3.png';
import resumeImg from '../assets/slide4.png';

// Slide data
const slides = [
  { name: 'Career Growth', image: careerImg },
  { name: 'Interview Tips', image: interviewImg },
  { name: 'Workplace Culture', image: officeImg },
  { name: 'Resume Building', image: resumeImg },
];

const Carousel = () => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto mt-10 overflow-hidden rounded-xl shadow-lg bg-gray-900">
      {/* Carousel Slides */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)`, width: `${length * 100}%` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-full flex-shrink-0 text-center bg-black">
            <div className="h-[450px] flex items-center justify-center bg-black">
              <img
                src={slide.image}
                alt={slide.name}
                className="w-full h-full object-contain"
                loading="lazy" // Optional: to improve load time
              />
            </div>
            <div className="bg-black bg-opacity-70 text-white py-3 text-xl font-semibold">
              {slide.name}
            </div>
          </div>
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-40 hover:bg-opacity-70 text-black rounded-full p-3"
      >
        ❮
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-40 hover:bg-opacity-70 text-black rounded-full p-3"
      >
        ❯
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 w-2 rounded-full ${
              index === current ? 'bg-white' : 'bg-gray-500'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
