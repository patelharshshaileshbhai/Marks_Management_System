import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Saffrony from "../Dashboard/images/saffrony.png";
import {  useFacultyAuth } from "../context/AuthProvider"; // Import Auth context if needed
import axios from 'axios';
import { toast, ToastContainer, Bounce } from 'react-toastify';
import Loader from '../Loader/Loader';

const FacultySidebar = ({ putMarkingClick }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { logout } = useFacultyAuth(); // Use Auth context for logout

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

    const handleSidebarToggle = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleLogout = async () => {
        const token = localStorage.getItem("facultyToken");
        setLoading(true);
        try {
            await axios.post('http://localhost:8000/api/v1/auth/teacher-logout', {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            // Clear local storage
            localStorage.removeItem("facultyToken"); // Clear the faculty token
            localStorage.removeItem("facultyData"); // Clear the faculty data
            localStorage.removeItem("facultyEmail");
            localStorage.removeItem("facultyName");
            logout(); // Call the logout function from context
    
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

        // setLoading(true);

        // // Clear local storage and update context
        // logout(); // Call the logout function from context

        // setLoading(false); // Ensure loading state is reset
        // setTimeout(() => {
        //     navigate("/"); // Redirect to homepage after logout
        // }, 1000);
    };
    
    

    return (
        <>
            {loading && <Loader />}
            <ToastContainer/>
            <div
                className="menu-icon md:hidden fixed top-4 left-4 text-3xl text-white z-50 cursor-pointer"
                onClick={handleSidebarToggle}
            >
                {isSidebarOpen ? '✖' : '☰'}
            </div>

            <div
                className={`fixed top-0 left-0 h-[100vh] p-4 rounded-r-2xl bg-[#000000] text-white transition-transform duration-300 ease-in-out rounded-lg border-4 border-[#7286ba] shadow-lg ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } md:translate-x-0 md:static md:w-1/6 z-40`}
            >
                <div className="flex items-center justify-center pt-6 h-32">
                    <img src={Saffrony} alt="Logo" className="h-24 w-auto" />
                </div>

                <div className="mt-10 flex flex-col gap-8 pl-6">
                    <Link
                        to="/"
                        className="flex items-center gap-4 text-lg text-gray-200 hover:text-white transition-colors font-dosis"
                    >
                        <i className="fa fa-windows text-xl"></i>
                        Faculty Dashboard
                    </Link>
                    <div
    onClick={() => {
        handleSidebarToggle(); // Toggles sidebar
        putMarkingClick(); // Opens the marking form
    }}
    className="flex items-center gap-4 text-lg text-gray-200 hover:text-white transition-colors cursor-pointer font-dosis"
>
    <i className="fa fa-credit-card text-xl"></i>
    Put Marking
</div>

                    <Link
                        to="/talkwithAI"
                        className="flex items-center gap-4 text-lg text-gray-200 hover:text-white transition-colors font-dosis"
                    >
                        <i className="fa fa-user-plus text-xl"></i>
                        Talk with AI
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-4 text-lg text-gray-200 hover:text-white transition-colors mt-10 font-dosis"
                    >
                        <i className="fa fa-sign-out-alt text-xl"></i>
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
};

export default FacultySidebar;
