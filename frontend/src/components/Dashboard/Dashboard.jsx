import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Navbar1 from './Navbar1';
import Banner from './Banner';
import SearchBar from './SearchBar';
import MarksDashboard from '../MarksDashboard/MarksDashboard';
import { useAuth } from '../context/AuthProvider';
import hello_boy from "../../assets/hello_boy.png";
import Footer from '../Footer/Footer';

const Dashboard = () => {
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [studentData, setStudentData] = useState(null); // State to hold the student data
    const [loading, setLoading] = useState(true); // Loading state to handle data fetching/loading
    const { isAuthenticated } = useAuth(); // Get authentication state

    useEffect(() => {
        // Retrieve studentData from localStorage on component mount
        const storedStudentData = localStorage.getItem("studentData");

        if (storedStudentData) {
            try {
                // Try parsing studentData only if it exists and is not null or undefined
                const parsedStudentData = JSON.parse(storedStudentData);
                setStudentData(parsedStudentData); // Set parsed data to state
            } catch (error) {
                console.error("Error parsing student data:", error);
            }
        }
        setLoading(false); // Set loading to false once the data is checked
    }, []);

    const handleProfileClick = () => {
        setShowSearchBar(true);
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
                <Sidebar onProfileClick={handleProfileClick} />

                {/* Main Content */}
                <div className="flex-1 p-5 maincontent">
                    <Navbar1 />
                    <Banner />
                    {showSearchBar && (
                        <SearchBar
                            placeholder="Enter Student Enrollment number"
                            onStudentData={handleStudentData} // Pass the handler to SearchBar
                        />
                    )}
                    <div className="flex justify-center mb-4">
                        <img
                            src={hello_boy}
                            alt="Hello Boy"
                            className="w-full h-auto max-w-xs md:max-w-md lg:max-w-lg object-contain"
                        />
                    </div>
                    {isAuthenticated && studentData && (
                        <MarksDashboard student={studentData} />
                    )} {/* Conditionally render MarksDashboard based on authentication and student data */}
                </div>
            </div>

            {/* Footer */}
            <Footer /> {/* Footer will be at the bottom, even with minimal content */}
        </div>
    );
};

export default Dashboard;
