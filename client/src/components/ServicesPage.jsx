import React from 'react';
import { FaBook, FaChalkboardTeacher, FaClipboardList } from 'react-icons/fa';

const ServicesPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
      <h1 className="text-5xl font-bold text-gray-800 mb-8">Our Services</h1>
      <p className="text-xl text-center mb-8 max-w-3xl">
        EasyNotes is dedicated to providing comprehensive educational resources to college students across various programs such as B.Tech, M.Tech, Pharma, M.Pharma, MBA, and more.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl ">
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center ">
          <FaBook className="text-4xl text-gray-500 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Notes</h2>
          <p className="text-lg text-gray-700 text-center">
            Get easy-to-follow notes tailored for college students. Our notes simplify complex topics, enhancing your understanding and helping you excel in your studies.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
          <FaChalkboardTeacher className="text-4xl text-gray-500 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Placement Ready</h2>
          <p className="text-lg text-gray-700 text-center">
            Sharpen your skills with our placement-ready resources. Designed for students across all streams, these materials boost your confidence and prepare you for the job market.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
          <FaClipboardList className="text-4xl text-gray-500 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Study Materials</h2>
          <p className="text-lg text-gray-700 text-center">
            Explore comprehensive study materials for various college programs. Our resources offer clear explanations and examples, making your learning journey smoother.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
