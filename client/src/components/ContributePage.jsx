import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCloudUploadAlt } from "react-icons/fa";

const ContributePage = () => {
    const navigate = useNavigate();
    
    const handleContribute = () => {
        window.open("https://docs.google.com/forms/d/e/1FAIpQLSfFXF75semH87pE2hfmRt-tIEAgWSnGmZmsap_9ijxH_LyEFw/viewform?usp=sf_link", "_blank");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center p-8">
            <h1 className="text-6xl font-bold mb-12 shadow-sm" style={{ color: '#141313' }}>Contribute on EasyNotes</h1>
            <p className="text-2xl text-center mb-12 max-w-5xl text-gray-800">
                Share your Notes, Assignments, Worksheets, and other resources. Become a part of the EasyNotes Student Partner Program and unlock exclusive benefits!
            </p>
            <button
                onClick={handleContribute}
                className="flex items-center px-10 py-5 bg-gray-800  text-white text-2xl font-semibold rounded-lg shadow-md transition-colors" style={{ backgroundColor: '#141313' }}
            >
                <FaCloudUploadAlt className="w-10 h-10 mr-4" />
                Contribute to EasyNotes
            </button>
        </div>
    );
};

export default ContributePage;
