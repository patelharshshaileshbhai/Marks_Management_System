import React, { useState } from 'react'; 
import { Link } from 'react-router-dom'; 
import Saffrony from "../Dashboard/images/saffrony.png"; 
import Loader from '../Loader/Loader';

const Sidebar = ({ onProfileClick }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [activeLink, setActiveLink] = useState(""); // State to track active link

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName); // Update active link
    handleSidebarToggle(); // Close the sidebar on mobile after click
  };

  return (
    <>
      {/* {loading && <Loader />} */}
      <div
        className="menu-icon md:hidden fixed top-4 left-4 text-3xl text-white z-50 cursor-pointer"
        onClick={handleSidebarToggle}
      >
        {isSidebarOpen ? '✖' : '☰'}
      </div>

      <div
        className={`fixed top-0 left-0 h-screen p-4 rounded-r-2xl bg-[#000000] text-white transition-transform duration-300 ease-in-out rounded-lg border-4 border-[#1c384f] shadow-lg ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:w-1/6 z-40`}
      >
        <div className="flex items-center justify-center pt-6 h-32">
          <img src={Saffrony} alt="Logo" className="h-24 w-auto" />
        </div>

        <div className="mt-10 flex flex-col gap-8 pl-6">
          <Link
            to="/"
            className={`flex items-center gap-4 text-lg transition-colors font-dosis ${
              activeLink === "home" ? "text-white border-l-4 border-blue-500 pl-2" : "text-gray-200 hover:text-white"
            }`}
            onClick={() => handleLinkClick("home")}
          >
            <i className="fa fa-home text-xl"></i>
            Home
          </Link>

          <div
            onClick={() => {
              handleLinkClick("profile");
              onProfileClick();
            }}
            className={`flex items-center gap-4 text-lg transition-colors cursor-pointer font-dosis ${
              activeLink === "profile" ? "text-white border-l-4 border-blue-500 pl-2" : "text-gray-200 hover:text-white"
            }`}
          >
            <i className="fa fa-credit-card text-xl"></i>
            Get Student Profile
          </div>

          <Link
            to="/TalkWithAIStudent"
            className={`flex items-center gap-4 text-lg transition-colors font-dosis ${
              activeLink === "talkAI" ? "text-white border-l-4 border-blue-500 pl-2" : "text-gray-200 hover:text-white"
            }`}
            onClick={() => handleLinkClick("talkAI")}
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
