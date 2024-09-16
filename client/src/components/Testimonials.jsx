import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    fetch('http://localhost:4000/api/testimonials')
      .then((response) => response.json())
      .then((data) => setTestimonials(data))
      .catch((error) => console.error('Error fetching testimonials:', error));
  }, []);

  const slideCount = 3;
  const totalSlides = Math.ceil(testimonials.length / slideCount);
  const maxIndex = totalSlides - 1;

  const nextTestimonial = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 300); // Animation duration should match the CSS transition
      setCurrentIndex((prevIndex) => (prevIndex === maxIndex ? 0 : prevIndex + 1));
    }
  };

  const prevTestimonial = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 300); // Animation duration should match the CSS transition
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? maxIndex : prevIndex - 1));
    }
  };

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          What People Say?
        </h2>
        <div className="relative flex items-center justify-center">
          <button
            onClick={prevTestimonial}
            className="absolute left-0 p-2 text-gray-600 hover:text-gray-900 focus:outline-none z-10"
          >
            <FiChevronLeft size={36} />
          </button>

          <div className="overflow-hidden w-full max-w-5xl">
            <div
              className={`flex transition-transform duration-300 ease-in-out ${
                isAnimating ? 'will-change-transform' : ''
              }`}
              style={{
                transform: `translateX(-${currentIndex * (100 / totalSlides)}%)`,
                width: `${totalSlides * 100}%`,
              }}
            >
              {Array.from({ length: totalSlides }).map((_, pageIndex) => (
                <div
                  key={pageIndex}
                  className="flex w-full"
                >
                  {testimonials.slice(pageIndex * slideCount, pageIndex * slideCount + slideCount).map((testimonial) => (
                    <div
                      key={testimonial._id}
                      className="flex-shrink-0 w-1/3 p-4 bg-white rounded-lg shadow-lg text-center mx-2"
                    >
                      <p className="text-xl text-gray-600 mb-4">
                        "{testimonial.review}"
                      </p>
                      <h3 className="text-2xl font-semibold text-gray-800">
                        - {testimonial.name}
                      </h3>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 p-2 text-gray-600 hover:text-gray-900 focus:outline-none z-10"
          >
            <FiChevronRight size={36} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
