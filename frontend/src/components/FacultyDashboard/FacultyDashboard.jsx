import React, { useState, useEffect } from 'react';
import FacultySidebar from './FacultySidebar';
import FacultyNavbar from './FacultyNavbar';
import FacultyBanner from './FacultyBanner';
import MarkingForm from './MarkingForm';
import { useFacultyAuth } from '../context/AuthProvider'; // Use the faculty auth context

const FacultyDashboard = () => {
    const [showMarkingForm, setShowMarkingForm] = useState(false);
    const [faculty, setFaculty] = useState({ name: '', email: '' });
    const [loading, setLoading] = useState(true); // Loading state for data fetching
    const { isAuthenticated } = useFacultyAuth(); // Get authentication state from the faculty context

    const handlePutMarkingClick = () => {
        setShowMarkingForm(true); // Function to show the marking form
    };

    useEffect(() => {
        // Fetch or retrieve the faculty data from localStorage on component mount
        const facultyData = localStorage.getItem('facultyData'); // Updated to match the correct storage key
        
        if (facultyData) {
            try {
                const parsedFacultyData = JSON.parse(facultyData);
                setFaculty({
                    name: parsedFacultyData.facultyName, // Use the correct key
                    email: parsedFacultyData.email,
                });
            } catch (error) {
                console.error("Error parsing faculty data:", error);
            }
        }
        setLoading(false); // Set loading to false once data is checked
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Render loading message or spinner while waiting for data
    }
    
    console.log("Is authenticated:", isAuthenticated);
    console.log("Show marking form:", showMarkingForm);

    return (
        <div className="flex flex-col md:flex-row">
            {/* Sidebar */}
            <FacultySidebar putMarkingClick={handlePutMarkingClick} />

            {/* Main Content */}
            <div className="flex-1 p-5 maincontent">
                <FacultyNavbar />
                <FacultyBanner name={faculty.name} email={faculty.email} />
                {isAuthenticated && showMarkingForm && <MarkingForm />} {/* Conditionally render MarkingForm based on authentication */}
            </div>
        </div>
    );
};

export default FacultyDashboard;
