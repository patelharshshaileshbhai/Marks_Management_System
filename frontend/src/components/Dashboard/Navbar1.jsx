import React, { useState } from 'react';
import boy_avatar from "../../assets/boy_avatar.png";
import StudentPopUp from '../Student PopUp/StudentPopUp';
import { useStudent } from '../context/AuthProvider';

const Navbar1 = () => {
    const [isPopUpOpen, setIsPopUpOpen] = useState(false);
    const { studentDetails } = useStudent()
    // const fullName = localStorage.getItem("fullName");
    // const studentEmail = localStorage.getItem("studentEmail");

    const togglePopUp = () => {
        setIsPopUpOpen(!isPopUpOpen);
    };

    return (
        <div className="flex flex-col md:flex-row justify-end items-center mb-4 pr-2">
            <div className="flex items-center gap-2">
                {/* Profile Section */}
                <div className="flex items-center" onClick={togglePopUp}>
                    <div className='mr-3'>
                        <p className="text-sm font-bold font-dosis">{studentDetails.fullname || "Student Name"}</p>
                    </div>
                    <div className="rounded-full border-2 border-[#925FE2] cursor-pointer overflow-hidden shadow-2xl w-14 h-14 flex items-center justify-center">
                        <img
                            src={boy_avatar}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
            <StudentPopUp 
                isOpen={isPopUpOpen} 
                onClose={togglePopUp} 
                // fullName={fullName} 
                // email={studentEmail} 
            />
        </div>
    );
};

export default Navbar1;
