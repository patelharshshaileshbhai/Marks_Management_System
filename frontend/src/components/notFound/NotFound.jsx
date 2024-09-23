// src/components/NotFoundPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Skeleton from './Skeleton.png'; // Adjust the path to your image

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 overflow-hidden">
            <div className="flex flex-col md:flex-row items-center max-w-screen-lg mx-4 md:mx-8 lg:mx-12 space-y-8 md:space-y-0 md:space-x-8 relative">
                
                {/* Boy Image (Top on mobile, Right on larger screens) */}
                <div className="relative flex-shrink-0 w-64 md:w-80 h-auto order-1 md:order-2">
                    <img
                        src={Skeleton}
                        alt="Boy pushing"
                        className="w-full h-auto"
                        style={{ animation: 'pushUp 3s ease-in-out infinite' }}
                    />
                </div>

                {/* Card */}
                <div className="bg-white p-8 md:p-12 shadow-2xl rounded-xl transform md:-rotate-3 flex-shrink-0 z-10 max-w-md md:max-w-lg lg:max-w-xl order-2 md:order-1">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-500 opacity-30 rounded-xl"></div>
                    <div className="relative z-10">
                        <h1 className="text-6xl md:text-8xl font-bold text-gray-800 mb-4 animate-pulse">404</h1>
                        <p className="text-lg md:text-2xl text-gray-700 mb-6">Whoops! The page you're looking for doesn't exist. 🩻🩻</p>
                        <p className="text-base md:text-lg text-gray-600 mb-8">It might have been moved, renamed, or just never existed.</p>
                        <button
                            onClick={() => navigate('/')}
                            className="bg-gradient-to-r from-teal-400 to-blue-500 text-white py-2 px-4 md:py-3 md:px-6 rounded-lg shadow-lg hover:from-teal-500 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300"
                        >
                            Go Back Home
                        </button>
                    </div>
                </div>
            </div>

            <style>
                {`
                @keyframes pushUp {
                    0% {
                        transform: translateY(0) rotate(-10deg);
                    }
                    50% {
                        transform: translateY(-10px) rotate(-5deg);
                    }
                    100% {
                        transform: translateY(0) rotate(-10deg);
                    }
                }
                `}
            </style>
        </div>
    );
};

export default NotFound;
