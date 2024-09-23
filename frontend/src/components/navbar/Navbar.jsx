import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth, useFacultyAuth } from "../context/AuthProvider"; // Import both contexts
import Loader from "../Loader/Loader";
import "./Navbar.css";
import axios from "axios";
import { toast, ToastContainer, Bounce } from 'react-toastify';

const Navbar = ({ hideSignUpButtons = false }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated: isStudentAuthenticated, logout: studentLogout } = useAuth();
  const { isAuthenticated: isFacultyAuthenticated, logout: facultyLogout } = useFacultyAuth();
  const navigate = useNavigate();
  const location = useLocation();

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

  const handleNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem(isFacultyAuthenticated ? "facultyToken" : "token");
      await axios.post(`https://midsem-mern.onrender.com/api/v1/${isFacultyAuthenticated ? 'faculty' : 'student'}/logout`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Clear local storage
      localStorage.removeItem(isFacultyAuthenticated ? "facultyToken" : "token");
      localStorage.removeItem("facultyData"); // If you have faculty data
      localStorage.removeItem("studentData"); // If you have student data
      isFacultyAuthenticated ? facultyLogout() : studentLogout(); // Call the appropriate logout function

      setTimeout(() => {
        setLoading(false);
        navigate("/"); // Redirect to home after logout
      }, 2000);
      
    } catch (error) {
      console.error('Error during logout:', error);
      toast.error('Logout failed, please try again.');
      setLoading(false);
    }
  };

  const handleDashboardClick = () => {
    setLoading(true);
    const dashboardPath = isFacultyAuthenticated ? "/FacultyDashboard" : "/Dashboard"; // Determine the correct dashboard
    setTimeout(() => {
      setLoading(false);
      navigate(dashboardPath);
    }, 2000);
  };

  const handleHomeClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 1000); // 1-second delay
  };

  const shouldHideButtons = hideSignUpButtons || location.pathname === "/StudentForm";

  return (
    <>
      <ToastContainer {...toastOptions} />
      <nav className="navbar">
        <a href="/" className="logo font-spicy">Saffrony</a>
        <div className="menu-icon" onClick={handleNavToggle}>
          {isNavOpen ? "✖" : "☰"}
        </div>
        <ul className={`nav-links ${isNavOpen ? "open" : ""}`}>
          <li>
            <a href="/" className="font-dosis" onClick={handleHomeClick}>Home</a>
          </li>
          <li>
            <a href="#about" className="font-dosis">About</a>
          </li>
          <li>
            <a href="#contact" className="font-dosis">Contact</a>
          </li>
          {!shouldHideButtons && (
            <>
              {!isStudentAuthenticated && !isFacultyAuthenticated ? (
                <>
                  <button
                    onClick={() => navigate("/StudentForm")}
                    className="btn-custom text-[#ffffff] font-dosis  hover:text-white hover:scale-105 transition-transform duration-1000 font-bold  tracking-[3px] text-[13px] px-2 py-2 outline outline-2 outline-[#2c9caf] shadow-lg hover:shadow-[4px_5px_17px_-4px_#268391]"
                  >
                    Sign up (Student)
                  </button>
                  <button
                    onClick={() => navigate("/FacultyAdminForm")}
                    className="btn-custom text-[#ffffff] font-dosis  hover:text-white hover:scale-105 transition-transform duration-1000 font-bold  tracking-[3px] text-[13px] px-2 py-2 outline outline-2 outline-[#2c9caf] shadow-lg hover:shadow-[4px_5px_17px_-4px_#268391]"
                  >
                    Sign up (Faculty / Admin)
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleDashboardClick}
                    className="relative py-2 px-4 text-white font-dosis  rounded-full bg-black transition-all duration-300 transform hover:shadow-[0_0_15px_5px_rgba(3,169,244,0.8)] active:shadow-[0_0_10px_2px_rgba(3,169,244,0.9)]"
                  >
                    Dashboard
                    <span className="absolute inset-0 rounded-full border-2 border-transparent hover:border-blue-400 transition-all duration-300"></span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="btn-custom text-[#ffffff] font-dosis  hover:text-white hover:scale-110 transition-transform duration-1000 font-bold capitalize tracking-[3px] text-[13px] px-2 py-1 outline outline-2 outline-[#f87171] shadow-lg hover:shadow-[4px_5px_17px_-4px_#e63946] hover:bg-[#f87171]"
                  >
                    Logout
                  </button>
                </>
              )}
            </>
          )}
        </ul>
      </nav>
      {loading && <Loader />}
    </>
  );
};

export default Navbar;
