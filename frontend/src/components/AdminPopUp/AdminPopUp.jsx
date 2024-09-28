import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {ToastContainer,toast,Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../Loader/Loader';
import {useAdminAuth} from "../context/AuthProvider"

// import { useNavigate } from 'react-router-dom';
// import { useAdminAuth } from '../context/AuthProvider';

const AdminPopUp = ({ isOpen, onClose, email }) => {
    // const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false)

    const { AdminLogout } = useAdminAuth()
    const navigate = useNavigate();

    const toastOptions = {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    };
    // const handleSave = (e) => {
    //     e.preventDefault();
    //     // Handle saving the updated details, e.g., make an API call
    //     console.log("Updated Details:", {
    //         updatedFullName,
    //         updatedEnrollment,
    //         updatedPhone,
    //         updatedBranch,
    //         updatedSemester,
    //     });
    //     setIsEditing(false); // Close the edit mode after saving
    // };

    const handleLogout = async () => {
            const token = localStorage.getItem("adminToken");
            setLoading(true);
            try {
                await axios.post('https://marks-management-system.onrender.com/api/v1/auth/admin-logout', {}, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
        
                // Clear local storage
                localStorage.removeItem("adminToken"); // Clear the faculty token
                localStorage.removeItem("adminData"); // Clear the faculty data
                localStorage.removeItem("adminEmail");
                
                AdminLogout(); // Call the logout function from context
        
                // Move loading state here
                setTimeout(() => {
                    setLoading(false); 
                    setTimeout(()=>{
                        toast.success("Logged out successfully", toastOptions);
                        navigate("/"); 
                    })
                    // Redirect to home after logout
                }, 2000);
        
            } catch (error) {
                setLoading(false); // Ensure loading state is reset on error
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
                {/* <h2 className="text-lg font-bold text-white font-dosis">{fullName}</h2> */}
                <h1 className="text-xl text-gray-200 font-dosis">{email}</h1>
                {/* <div className="mt-4 space-y-2">
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="w-full bg-[#204781] text-white rounded py-2 hover:bg-[#2c4f79] transition font-dosis"
                    >
                        Profile
                    </button>
                   
                </div> */}

                {/* Editable Fields */}
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

export default AdminPopUp;
