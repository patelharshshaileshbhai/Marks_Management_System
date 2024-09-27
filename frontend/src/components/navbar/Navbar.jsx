import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAdminAuth, useAuth, useFacultyAuth } from "../context/AuthProvider"; // Import both contexts
import Loader from "../Loader/Loader";
import "./Navbar.css";
import axios from "axios";
import { toast, ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = ({ hideSignUpButtons = false }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated: isStudentAuthenticated, StudentLogout } = useAuth(); // Add student auth state
  const { isAuthenticated: isFacultyAuthenticated, FacultyLogout } = useFacultyAuth(); // Add faculty auth state
  const {isAuthenticated : isAdminAuthenticated , AdminLogout} = useAdminAuth();  // Add admin auth state

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
      const FacultyToken = localStorage.getItem("facultyToken");
      const StudentToken = localStorage.getItem("token");
      const AdminToken = localStorage.getItem("adminToken");

      // For Faculty
      if (isFacultyAuthenticated && FacultyToken) {
        await axios.post('https://marks-management-system.onrender.com/api/v1/auth/teacher-logout', {}, {
          headers: {
            Authorization: `Bearer ${FacultyToken}`,
          },
        });
        localStorage.removeItem("facultyToken");
        localStorage.removeItem("facultyData");
        localStorage.removeItem("facultyEmail");
        localStorage.removeItem("facultyName");
        FacultyLogout();
      }

      if (isAdminAuthenticated && AdminToken) {
        await axios.post('https://marks-management-system.onrender.com/api/v1/auth/admin-logout', {}, {
          headers: {
            Authorization: `Bearer ${AdminToken}`,
          },
        });
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminData");
        localStorage.removeItem("adminEmail");
    
        AdminLogout();
      }

      // For Student
      if (isStudentAuthenticated && StudentToken) {
        await axios.post('http://localhost:8000/api/v1/student/logout', {}, {
          headers: {
            Authorization: `Bearer ${StudentToken}`,
          },
        });
        localStorage.removeItem("studentData");
        localStorage.removeItem("token");
        localStorage.removeItem("studentEmail");
        localStorage.removeItem("studentEnrollment");
        localStorage.removeItem("fullName");
        StudentLogout();
      }

      setTimeout(() => {
        setLoading(false);
        toast.success("Logged out successfully", toastOptions);
        navigate("/");
      }, 2000);
    } catch (error) {
      setLoading(false);
      console.error('Error during logout:', error);
      toast.error('Logout failed, please try again.');
    }
  };
  
    const handleDashboardClick = () => {
      setLoading(true);
  
      // Check both faculty and student authentication explicitly
      if (isFacultyAuthenticated) {
        navigate("/FacultyDashboard");
      } else if (isStudentAuthenticated) {
        navigate("/Dashboard");
      }
      else if (isAdminAuthenticated){
        navigate("/AdminDashboard");
      } else {
        // If no authentication, show an error or redirect to login
        toast.error("You are not logged in!", toastOptions);
        navigate("/login");
      }
  
      setTimeout(() => {
        setLoading(false);
      }, 2000);
  };

  const handleHomeClick = () => {
    setLoading(true);
    setIsNavOpen(false); // Close the navbar
    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 1000); // 1-second delay
  };

  const handleLinkClick = (sectionId) => {
    const section = document.querySelector(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setIsNavOpen(false); // Close the navbar after link click
  };

  const handleAboutClick = () => {
    if (location.pathname === "/") {
      handleLinkClick("#about");
    } else {
      navigate("/about"); // Change this to your actual about page route
    }
  };
  
  const handleContactClick = () => {
    if (location.pathname === "/") {
      handleLinkClick("#contact");
    } else {
      navigate("/contact"); // Change this to your actual contact page route
    }
  };
  const shouldHideButtons = hideSignUpButtons || location.pathname.includes("Form");

  return (
    <>
      <ToastContainer {...toastOptions} />
      <nav className="navbar">
        <a href="/" className="logo font-spicy text-[#ed5d35]">Saffrony</a>
        <div className="menu-icon" onClick={handleNavToggle}>
          {isNavOpen ? "✖" : "☰"}
        </div>
        <ul className={`nav-links ${isNavOpen ? "open" : ""}`}>
         <li>
            <a className="font-dosis" onClick={handleHomeClick}>Home</a>
          </li>
          <li>
            <a className="font-dosis" onClick={handleAboutClick}>About</a>
          </li>
          <li>
            <a className="font-dosis" onClick={handleContactClick}>Contact</a>
          </li>
          {!shouldHideButtons && (
            <>
              {/* Display buttons based on student or faculty authentication */}
              {(!isStudentAuthenticated && !isFacultyAuthenticated && !isAdminAuthenticated) ? (
                <>
                  <button
                    onClick={() => navigate("/StudentForm")}
                    className="btn-custom text-[#ffffff] font-dosis hover:text-white hover:scale-105 transition-transform duration-1000 font-bold tracking-[3px] text-[13px] px-2 py-2 outline outline-2 outline-[#2c9caf] shadow-lg hover:shadow-[4px_5px_17px_-4px_#268391]"
                  >
                    Sign up (Student)
                  </button>
                  <button
                    onClick={() => navigate("/FacultyLoginForm")}
                    className="btn-custom text-[#ffffff] font-dosis hover:text-white hover:scale-105 transition-transform duration-1000 font-bold tracking-[3px] text-[13px] px-2 py-2 outline outline-2 outline-[#2c9caf] shadow-lg hover:shadow-[4px_5px_17px_-4px_#268391]"
                  >
                    Sign up (Faculty / Admin)
                  </button>
                </>
              ) : (
                <>
                  {/* Show dashboard and logout if either student or faculty is authenticated */}
                  <button
                    onClick={handleDashboardClick}
                    className="relative py-2 px-4 text-white font-dosis rounded-full bg-black transition-all duration-300 transform hover:shadow-[0_0_15px_5px_rgba(3,169,244,0.8)] active:shadow-[0_0_10px_2px_rgba(3,169,244,0.9)]"
                  >
                    Dashboard
                    <span className="absolute inset-0 rounded-full border-2 border-transparent hover:border-blue-400 transition-all duration-300"></span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="btn-custom text-[#ffffff] font-dosis hover:text-white hover:scale-110 transition-transform duration-1000 font-bold capitalize tracking-[3px] text-[13px] px-2 py-1 outline outline-2 outline-[#f87171] shadow-lg hover:shadow-[4px_5px_17px_-4px_#e63946] hover:bg-[#f87171]"
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
