import React from 'react';
import { useStudent } from '../context/AuthProvider'; // Ensure correct import of StudentContext

const Banner = () => {
    const { studentDetails } = useStudent(); // Access student details from context
    
    const getSpecifiedDate = () => {
        const date = new Date();

        const months = [
            "January", "February", "March", "April", "May", "June", 
            "July", "August", "September", "October", "November", "December"
        ];

        const day = date.getDate();
        const year = date.getFullYear();
        const month = months[date.getMonth()];

        const getSuffix = (day) => {
            if (day > 3 && day < 21) return "th";
            switch (day % 10) {
                case 1: return "st";
                case 2: return "nd";
                case 3: return "rd";
                default: return "th";
            }
        };

        return `${month} ${day}${getSuffix(day)}, ${year}`;
    };

    const currentDate = getSpecifiedDate();

    return (
        <div className="p-5 bg-[#000000] relative overflow-hidden banner rounded-lg border-4 border-[#1c384f] shadow-lg">
            <div className="flex flex-col md:flex-row items-center mx-5 bannermaindiv">
                {/* Left Side */}
                <div className="flex flex-col mb-6 md:mb-0 leftsiddivbanner">
                    <p className="text-gray-200 text-lg font-dosis">{currentDate}</p>
                    <div>
                        <h1 className="text-3xl text-white mb-2 font-bold font-dosis">
                            Welcome back, {studentDetails.fullname || "Student Name"}!
                        </h1>
                        <p className="text-gray-200 font-dosis">{studentDetails.email || "Email Address"}</p>
                        <p className="text-gray-200 font-dosis">Always stay updated on your student portal.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
