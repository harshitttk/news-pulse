import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl my-4 animate-pulse">
      <div className="md:flex">
        {/* Placeholder for image */}
        <div className="md:flex-shrink-0">
          <div className="h-48 w-full bg-gray-300 md:w-48"></div>
        </div>
        
        <div className="p-8">
          {/* Placeholder for title */}
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
          
          {/* Placeholder for description */}
          <div className="space-y-4">
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            <div className="h-4 bg-gray-300 rounded w-4/5"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
