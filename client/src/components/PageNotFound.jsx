import React from 'react';

const PageNotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800">
      <h1 className="text-9xl font-bold text-red-500 animate-bounce">404</h1>
      <h2 className="text-4xl font-semibold mt-4">Page Not Found</h2>
      <p className="mt-2 text-lg text-gray-600">Oops! The page you're looking for doesn't exist.</p>
      <a href="/" className="mt-6 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300">
        Go Back Home
      </a>
    </div>
  );
};

export default PageNotFound;
