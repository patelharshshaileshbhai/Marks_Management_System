import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Navbar1 from './Navbar1';
import Banner from './Banner';
import SearchBar from './SearchBar';
import MarksDashboard from '../MarksDashboard/MarksDashboard';
import { StudentProvider, useAuth } from '../context/AuthProvider';
import hello_boy from "../../assets/hello_boy.png";
import Footer from '../Footer/Footer';

const Dashboard = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [studentData, setStudentData] = useState(null); // State to hold the student data
  const [loading, setLoading] = useState(true); // Loading state to handle data fetching/loading
  const [showHelloBoy, setShowHelloBoy] = useState(true); // State to manage visibility of Hello Boy image
  const [showTalkWithAI, setShowTalkWithAI] = useState(false); // State for TalkWithAI visibility
  const { isAuthenticated } = useAuth(); // Get authentication state

  useEffect(() => {
    const storedStudentData = localStorage.getItem("studentData");

    if (storedStudentData) {
      try {
        const parsedStudentData = JSON.parse(storedStudentData);
        setStudentData(parsedStudentData); // Set parsed data to state
      } catch (error) {
        console.error("Error parsing student data:", error);
      }
    } else {
      console.warn("No student data found in localStorage");
    }

    setLoading(false); // Set loading to false once the data is checked
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const storedStudentData = localStorage.getItem("studentData");
      if (storedStudentData) {
        try {
          const parsedStudentData = JSON.parse(storedStudentData);
          setStudentData(parsedStudentData);
        } catch (error) {
          console.error("Error parsing student data:", error);
        }
      }
    }
  }, [isAuthenticated]);

  const handleProfileClick = () => {
    setShowSearchBar(true);
    setShowHelloBoy(false);
    setShowTalkWithAI(false); // Hide TalkWithAI when searching for profiles
  };

  const handleTalkWithAIClick = () => {
    setShowSearchBar(false);
    setShowHelloBoy(false);
    setShowTalkWithAI(true); // Show TalkWithAI when clicked
  };

  const handleHomeClick = () => {
    setShowSearchBar(false);
    setShowTalkWithAI(false);
    setShowHelloBoy(true); // Show Hello Boy when clicking Home
  };

  const handleStudentData = (data) => {
    setStudentData(data); // Update local state
    localStorage.setItem("studentData", JSON.stringify(data)); // Store in local storage
  };

  if (loading) {
    return <div>Loading...</div>; // Render a loading message or spinner while waiting for data
  }

  return (
    <div className="flex flex-col min-h-screen"> {/* Ensure the entire screen height is filled */}
      <div className="flex flex-1 flex-col md:flex-row">
        {/* Sidebar */}
        <Sidebar 
          onProfileClick={handleProfileClick}
          onTalkWithAIClick={handleTalkWithAIClick}
          onHomeClick={handleHomeClick}
        />

        {/* Main Content */}
        <div className="flex-1 p-5 maincontent">
         <StudentProvider>
          <Navbar1 />
          <Banner />
          </StudentProvider>
         
          {showSearchBar && (
            <SearchBar
              placeholder="Enter Student Enrollment number"
              onStudentData={handleStudentData} // Pass the handler to SearchBar
            />
          )}

          {/* Conditionally render Hello Boy image */}
          {showHelloBoy && (
            <div className="flex justify-center mb-4">
              <img
                src={hello_boy}
                alt="Hello Boy"
                className="w-full h-auto max-w-xs md:max-w-md lg:max-w-lg object-contain"
              />
            </div>
          )}

          {/* Conditionally render MarksDashboard based on authentication and student data */}
          {isAuthenticated && studentData && (
            <MarksDashboard student={studentData} />
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer /> {/* Footer will be at the bottom, even with minimal content */}
    </div>
  );
};

export default Dashboard;
