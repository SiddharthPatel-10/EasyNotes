import React from 'react';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

const QuotePage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
            <div className="text-center max-w-4xl mx-auto">
                <FaQuoteLeft className="text-4xl text-gray-800 mb-6" />
                <p className="text-6xl font-bold text-gray-800 mb-4">
                    Education is the most powerful weapon which you can use to change the world
                </p>
                <div className="text-right text-xl text-gray-600">
                    – Nelson Mandela
                </div>
                <FaQuoteRight className="text-4xl text-gray-800 mt-6" />
            </div>
        </div>
    );
};

export default QuotePage;
