import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchBranchesByCourseId } from "../features/branches/branchesSlice";
import { GrPowerReset } from "react-icons/gr";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

const BranchPage = () => {
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [resetting, setResetting] = useState(false);

  const branches = useSelector((state) => state.branches.list);
  const status = useSelector((state) => state.branches.status);
  const error = useSelector((state) => state.branches.error);

  useEffect(() => {
    if (courseId) {
      dispatch(fetchBranchesByCourseId(courseId));
    }
  }, [courseId, dispatch]);

  const handleBranchSelect = (branchId) => {
    if (branchId) {
      navigate(`/semester/${branchId}`);
    }
  };

  const handleReset = () => {
    setResetting(true);
    setTimeout(() => {
      navigate("/");
    }, 300); // Match the duration of the rotation animation
  };

  if (status === "loading") {
    return <div className="p-6">Loading branches...</div>;
  }

  if (status === "failed") {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-6">Select Branch</h2>
      {status === "succeeded" && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {branches.map((branch) => (
              <div
                key={branch._id}
                onClick={() => handleBranchSelect(branch._id)}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer relative group"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {branch.name}
                </h3>
                <ArrowRightIcon className="w-6 h-6 text-gray-500 absolute top-1/2 right-4 transform -translate-y-1/2 transition-transform duration-300 group-hover:translate-x-2" />
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
          <button
          onClick={handleReset}
          className="relative bg-red-500 hover:bg-red-600 text-white py-2 px-4 pr-8 rounded-full transition-all duration-300 flex items-center justify-center mx-auto"
        >
          <span className="relative z-10">Reset</span>
          <GrPowerReset
            className={`absolute right-2 text-white ${resetting ? 'animate-rotate' : ''}`}
            size={20}
          />
        </button>
          </div>
        </>
      )}
    </div>
  );
};

export default BranchPage;
