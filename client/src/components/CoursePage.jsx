import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses } from '../features/courses/coursesSlice';
import { useNavigate } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { GrPowerReset } from 'react-icons/gr';

const CoursePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [resetting, setResetting] = useState(false);

  // Selecting courses data and status from the Redux store
  const courses = useSelector((state) => state.courses.list);
  const status = useSelector((state) => state.courses.status);
  const error = useSelector((state) => state.courses.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCourses());
    }
  }, [dispatch, status]);

  const handleCourseSelect = (courseId) => {
    navigate(`/branch/${courseId}`);
  };

  const handleReset = () => {
    setResetting(true);
    setTimeout(() => {
      navigate('/');
    }, 300); // Match the duration of the rotation animation
  };

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-700 text-lg">Loading courses...</p>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-red-500 text-lg">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8">Select Your Course</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full px-4 md:px-12 lg:px-24 xl:px-40 2xl:px-64">

        {courses.map((course) => (
          <div
            key={course._id}
            onClick={() => handleCourseSelect(course._id)}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer flex items-center justify-between group"
          >
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">{course.name}</h3>
              <p className="text-gray-600">Explore branches for this course</p>
            </div>
            <ArrowRightIcon
              className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 transition-transform duration-300 ease-in-out transform group-hover:translate-x-2"
            />
          </div>
        ))}
      </div>
      <div className="text-center mt-6">
        <button
          onClick={handleReset}
          className="relative bg-red-500 hover:bg-red-600 text-white py-2 px-4 pr-8 rounded-full transition-all duration-300 flex items-center justify-center"
        >
          <span className="relative z-10">Reset</span>
          <GrPowerReset
            className={`absolute right-2 text-white ${resetting ? 'animate-rotate' : ''}`}
            size={20}
          />
        </button>
      </div>
    </div>
  );
};

export default CoursePage;
