import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminNavbar from '../AdminDashboard/AdminNavbar';
import AdminBanner from './AdminBanner';
import Footer from "../Footer/Footer";

// Import all your components
import GetAllStudentsBySemesterAndBranch from './GetAllStudentsBySemesterAndBranch';
import GetAllStudents from './GetAllStudents';
import GetAllFacultiesByDepartment from './GetAllFacultiesByDepartment';
import GetAllFaculties from './GetAllFaculties';
import GetStudentByEnrollment from './GetStudentByEnrollment';
import GetStudentsByDepartment from './GetStudentsByDepartment';
import GetStudentsBySemester from './GetStudentsBySemester';


const AdminDashboard = () => {
    const [selectedComponent, setSelectedComponent] = useState(null); // State to track selected component

    const renderComponent = () => {
        switch (selectedComponent) {
            case 'GetAllStudentsBySemesterAndBranch':
                return <GetAllStudentsBySemesterAndBranch />;
            case 'GetAllStudents':
                return <GetAllStudents />;
            case 'GetAllFacultiesByDepartment':
                return <GetAllFacultiesByDepartment />;
            case 'GetAllFaculties':
                return <GetAllFaculties />;
            case 'GetStudentByEnrollment':
                return <GetStudentByEnrollment />;
            case 'GetStudentsByDepartment':
                return <GetStudentsByDepartment/>;
            case 'GetStudentsBySemester':
                return <GetStudentsBySemester/>;
            default:
                return null; // No component selected
        }
    };

    return (
        <>
            <div className="flex flex-col md:flex-row min-h-screen">
                {/* Sidebar */}
                <AdminSidebar setSelectedComponent={setSelectedComponent} />

                {/* Main Content */}
                <div className="flex-1 p-5 maincontent">
                    <AdminNavbar />
                    <AdminBanner />
                    <div className="mt-10 md:mt-20">
                        {renderComponent()} {/* Render the selected component here */}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AdminDashboard;
