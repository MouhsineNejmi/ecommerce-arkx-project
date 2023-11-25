/* eslint-disable react/prop-types */
import { useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const slides = [
  {
    title: 'Slide 1',
    description: 'Description for Slide 1',
    image:
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    title: 'Slide 2',
    description: 'Description for Slide 2',
    image: 'https://placekitten.com/800/401',
  },
  {
    title: 'Slide 3',
    description: 'Description for Slide 3',
    image: 'https://placekitten.com/800/402',
  },
];

const Slider = () => {
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
    <div className='custom-container'>
      <div className='relative w-full overflow-hidden'>
        {/* Carousel Slides */}
        <div
          className='flex transition-transform duration-500 ease-in-out transform'
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <img
              key={index}
              className='w-full h-[600px] bg-cover bg-center flex-shrink-0 relative'
              style={{ backgroundImage: `url(${slide.image})` }}
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
    </div>
  );
};

export default Slider;
