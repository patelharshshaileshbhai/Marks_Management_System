import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Navbar1 from './Navbar1';
import Banner from './Banner';
import SearchBar from './SearchBar';
import MarksDashboard from '../MarksDashboard/MarksDashboard';
import { useAuth } from '../context/AuthProvider';

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
        <div className="flex flex-col md:flex-row">
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
                {isAuthenticated && studentData && (
                    <MarksDashboard student={studentData} />
                )} {/* Conditionally render MarksDashboard based on authentication and student data */}
            </div>
        </div>
    );
};

export default Dashboard;