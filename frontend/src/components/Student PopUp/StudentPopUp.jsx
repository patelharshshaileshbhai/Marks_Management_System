import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer,toast,Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../Loader/Loader';
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const StudentPopUp = ({ isOpen, onClose, fullName, email }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false)
    const [updatedFullName, setUpdatedFullName] = useState(fullName);
    const [updatedEnrollment, setUpdatedEnrollment] = useState('');
    const [updatedPhone, setUpdatedPhone] = useState('');
    const [updatedBranch, setUpdatedBranch] = useState('');
    const [updatedSemester, setUpdatedSemester] = useState('');
    const { StudentLogout } = useAuth();
    const navigate = useNavigate();

    const toastOptions = {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    };
    const handleSave = (e) => {
        e.preventDefault();
        // Handle saving the updated details, e.g., make an API call
        console.log("Updated Details:", {
            updatedFullName,
            updatedEnrollment,
            updatedPhone,
            updatedBranch,
            updatedSemester,
        });
        setIsEditing(false); // Close the edit mode after saving
    };

    const handleLogout = async () => {
        const token = localStorage.getItem("token");
        setLoading(true)
        try {
          await axios.post('https://marks-management-system.onrender.com/api/v1/student/logout', {}, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    
          // Clear local storage
          localStorage.removeItem("token");
          localStorage.removeItem("fullName");
          localStorage.removeItem("studentEmail");
          localStorage.removeItem('studentData');
          localStorage.removeItem("studentEnrollment");
           // Call the logout function from context
    
          setTimeout(() => {
            setLoading(false); 
            setTimeout(()=>{
                StudentLogout();
                toast.success("Logged out successfully", toastOptions);
                navigate("/"); 
            },2000)
            // Redirect to home after logout
        }, 2000);
          
        } catch (error) {
          console.error('Error during logout:', error);
          toast.error('Logout failed, please try again.');
        }
      };
    if (!isOpen) return null; // Do not render if not open

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <ToastContainer/>
            {loading && <Loader />}
            <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-8 shadow-lg w-11/12 max-w-md h-auto">
                <h2 className="text-lg font-bold text-white font-dosis">{fullName}</h2>
                <p className="text-sm text-gray-200 font-dosis">{email}</p>
                <div className="mt-4 space-y-2">
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="w-full bg-[#204781] text-white rounded py-2 hover:bg-[#2c4f79] transition font-dosis"
                    >
                        Profile
                    </button>
                   
                </div>

                {/* Editable Fields */}
                {isEditing && (
                    <form onSubmit={handleSave} className="mt-4 space-y-4">
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={updatedFullName}
                            onChange={(e) => setUpdatedFullName(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg placeholder-gray-700 text-gray-900 font-dosis"
                        />
                        <input
                            type="number"
                            placeholder="Enrollment Number"
                            value={updatedEnrollment}
                            onChange={(e) => setUpdatedEnrollment(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg placeholder-gray-700 text-gray-900 font-dosis"
                        />
                        <input
                            type="number"
                            placeholder="Phone Number"
                            value={updatedPhone}
                            onChange={(e) => setUpdatedPhone(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg placeholder-gray-700 text-gray-900 font-dosis"
                        />
                        <select
                            value={updatedBranch}
                            onChange={(e) => setUpdatedBranch(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg placeholder-gray-700 text-gray-900 font-dosis"
                        >
                            <option value="">Select Branch</option>
                            <option value="CE">Computer Engineering (CE)</option>
                            <option value="IT">Information Technology (IT)</option>
                            <option value="ME">Mechanical Engineering (ME)</option>
                            <option value="CL">Civil Engineering (CL)</option>
                        </select>
                        <select
                            value={updatedSemester}
                            onChange={(e) => setUpdatedSemester(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg placeholder-gray-700 text-gray-900 font-dosis"
                        >
                            <option value="">Select Semester</option>
                            {Array.from({ length: 8 }, (_, i) => (
                                <option key={i + 1} value={i + 1}>
                                    Semester {i + 1}
                                </option>
                            ))}
                        </select>
                        <button
                            type="submit"
                            className="w-full bg-[#1F3848] text-white py-2 rounded-lg font-dosis"
                        >
                            Save
                        </button>
                    </form>
                )}
                <div className='flex justify-center mt-3'>
                     <button onClick={handleLogout} className="w-40 bg-[#de0808] text-white rounded py-2 hover:bg-[#e34d4d] transition font-dosis">
                        Logout
                    </button>
                    </div>
                <button className="text-gray-200 underline mt-4 font-dosis" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default StudentPopUp;
