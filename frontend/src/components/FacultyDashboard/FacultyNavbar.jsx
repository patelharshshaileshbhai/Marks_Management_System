import React from 'react';
import Harsh from "../Dashboard/images/Harsh.jpeg";

const FacultyNavbar = () => {
    const facultyName = localStorage.getItem("facultyName"); // Changed to "fullName" for consistency
    const facultyEmail = localStorage.getItem("facultyEmail");

    return (
        <div className="flex flex-col md:flex-row justify-end items-center mb-4 pr-2">
            <div className="flex items-center gap-2">
                {/* Profile Section */}
                <div className="flex items-center">
                    <div className='mr-3'>
                        <p className="text-sm font-bold font-dosis">{facultyName || "Faculty Name"}</p>
                        {/* <p className="text-xs text-gray-600">{facultyEmail || "Email not available"}</p> */}
                    </div>
                    <div className="rounded-full border-2 border-[#925FE2] overflow-hidden shadow-2xl">
                        <img
                            src={Harsh} // Replace with the actual image source
                            alt="Profile"
                            className="w-10 h-10 cursor-pointer"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FacultyNavbar;
