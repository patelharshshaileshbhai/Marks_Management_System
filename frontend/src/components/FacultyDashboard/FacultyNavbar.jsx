import React , {useState} from 'react';
import boy_avatar from "../../assets/boy_avatar.png";
import FacultyPopUp from '../Faculty PopUP/FacultyPopUp';

const FacultyNavbar = () => {
    const [isPopUpOpen, setIsPopUpOpen] = useState(false);
    const facultyName = localStorage.getItem("facultyName"); // Changed to "fullName" for consistency
    const facultyEmail = localStorage.getItem("facultyEmail");


    const togglePopUp = () => {
        setIsPopUpOpen(!isPopUpOpen);
    };

    return (
        <div className="flex flex-col md:flex-row justify-end items-center mb-4 pr-2">
            <div className="flex items-center gap-2">
                {/* Profile Section */}
                <div onClick={togglePopUp} className="flex items-center">
                    <div className='mr-3'>
                        <p className="text-sm font-bold font-dosis">{facultyName || "Faculty Name"}</p>
                        {/* <p className="text-xs text-gray-600">{facultyEmail || "Email not available"}</p> */}
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
            <FacultyPopUp
                isOpen={isPopUpOpen} 
                onClose={togglePopUp} 
                fullName={facultyName} 
                email={facultyEmail} 
            />
        </div>
    );
};

export default FacultyNavbar;
