/* eslint-disable react/prop-types */
import { useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const Slider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <>
      <div className='relative w-full overflow-hidden'>
        {/* Carousel Slides */}
        <div
          className='flex transition-transform duration-500 ease-in-out transform'
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <img
              key={index}
              className='w-full h-[600px] bg-cover bg-no-repeat bg-center flex-shrink-0 relative'
              style={{ backgroundImage: `url(${slide})` }}
            />
          ))}
        </div>

        {/* Carousel Buttons */}
        <div className='absolute inset-0 flex items-center justify-between p-4'>
          <button
            onClick={goToPrevSlide}
            className='p-2 rounded-full shadow bg-white bg-opacity-80 text-gray-800 hover:bg-white'
          >
            <ArrowLeftIcon className='w-6 h-6' />
          </button>
          <button
            onClick={goToNextSlide}
            className='p-2 rounded-full shadow bg-white text-gray-800 hover:bg-white'
          >
            <ArrowRightIcon className='w-6 h-6' />
          </button>
        </div>

        {/* Carousel Dots */}
        <div className='absolute bottom-4 right-0 left-0'>
          <div className='flex items-center justify-center gap-2'>
            {slides.map((_, i) => (
              <div
                key={i}
                className={`
              transition-all w-2 h-2 bg-white rounded-full
              ${currentIndex === i ? 'w-6' : 'bg-opacity-50'}
            `}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Slider;
