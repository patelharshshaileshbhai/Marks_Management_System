import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Saffrony from "../Dashboard/images/saffrony.png";
// import { useAuth } from "../context/AuthProvider"; 
// import axios from 'axios';
import { toast, ToastContainer, Bounce} from 'react-toastify';
import Loader from '../Loader/Loader';

const Sidebar = ({ onProfileClick }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false)
  // const navigate = useNavigate();
  // const { StudentLogout } = useAuth();


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

  // const handleLogout = async () => {
  //   const token = localStorage.getItem("token");
  //   setLoading(true)
  //   try {
  //     await axios.post('https://midsem-mern.onrender.com/api/v1/student/logout', {}, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     // Clear local storage
  //     localStorage.removeItem("token");
  //     localStorage.removeItem("fullName");
  //     localStorage.removeItem("studentEmail");
  //     localStorage.removeItem('studentData');
  //     localStorage.removeItem("studentEnrollment");
  //     StudentLogout(); // Call the logout function from context

  //     setTimeout(() => {
  //       setLoading(false); 
  //       setTimeout(()=>{
  //           toast.success("Logged out successfully", toastOptions);
  //           navigate("/"); 
  //       })
  //       // Redirect to home after logout
  //   }, 2000);
      
  //   } catch (error) {
  //     console.error('Error during logout:', error);
  //     toast.error('Logout failed, please try again.');
  //   }
  // };

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
        className={`fixed top-0 left-0 h-screen p-4 rounded-r-2xl bg-[#000000] text-white transition-transform duration-300 ease-in-out rounded-lg border-4 border-[#1c384f] shadow-lg ${
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
            Home
          </Link>
          <div
            onClick={() => {
              handleSidebarToggle();
              onProfileClick();
            }}
            className="flex items-center gap-4 text-lg text-gray-200 hover:text-white transition-colors cursor-pointer font-dosis"
          >
            <i className="fa fa-credit-card text-xl"></i>
            Get Student Profile
          </div>
          <Link
            to="/TalkWithAIStudent"
            className="flex items-center gap-4 text-lg text-gray-200 hover:text-white transition-colors font-dosis"
          >
            <i className="fa fa-user-plus text-xl"></i>
            Talk with AI
          </Link>

          {/* <button
            onClick={handleLogout}
            className="flex items-center gap-4 text-lg text-gray-200 hover:text-white transition-colors mt-10 font-dosis"
          >
            <i className="fa fa-sign-out-alt text-xl"></i>
            Logout
          </button> */}
        </div>
      </div>
    </>
  );
};

export default Sidebar;