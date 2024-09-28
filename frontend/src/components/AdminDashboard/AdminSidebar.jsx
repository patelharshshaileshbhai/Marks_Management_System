import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Saffrony from "../Dashboard/images/saffrony.png";
import "./AdminSidebar.css"

const AdminSidebar = ({ setSelectedComponent }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeLink, setActiveLink] = useState(""); // State to track active link
    const handleSidebarToggle = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleComponentSelect = (component) => {
        setActiveLink(component)
        setSelectedComponent(component);
        handleSidebarToggle();
    };

    return (
        <>
            <div
                className="menu-icon md:hidden fixed top-4 left-4 text-3xl text-white z-50 cursor-pointer"
                onClick={handleSidebarToggle}
            >
                {isSidebarOpen ? '✖' : '☰'}
            </div>

            <div
                className={`fixed top-0 left-0 h-[100vh] w-64 p-4 bg-[#000000] text-white transition-transform duration-300 ease-in-out rounded-lg border-4 border-[#7286ba] shadow-lg overflow-y-auto no-scrollbar ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } md:translate-x-0 md:static md:w-1/6 z-40`}
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
                    >
                        <i className="fa fa-home text-xl"></i>
                        Home
                    </Link>
                    <div
                        onClick={() => handleComponentSelect('GetAllStudentsBySemesterAndBranch')}
                        className={`flex items-center gap-4 text-lg transition-colors font-dosis ${
                            activeLink === "GetAllStudentsBySemesterAndBranch" ? "text-white border-l-4 border-blue-500 pl-2" : "text-gray-200 hover:text-white"
                          }`}
                    >
                        <i className="fa-solid fa-paper-plane text-xl"></i>
                        Get all Students by semester & branch
                    </div>
                    <div
                        onClick={() => handleComponentSelect('GetStudentByEnrollment')}
                        className={`flex items-center gap-4 text-lg transition-colors font-dosis ${
                            activeLink === "GetStudentByEnrollment" ? "text-white border-l-4 border-blue-500 pl-2" : "text-gray-200 hover:text-white"
                          }`}
                    >
                        <i className="fa-solid fa-paper-plane text-xl"></i>
                        Get student by enrollment
                    </div>
                    <div
                        onClick={() => handleComponentSelect('GetAllStudents')}
                        className={`flex items-center gap-4 text-lg transition-colors font-dosis ${
                            activeLink === "GetAllStudents" ? "text-white border-l-4 border-blue-500 pl-2" : "text-gray-200 hover:text-white"
                          }`}
                    >
                        <i className="fa-solid fa-paper-plane text-xl"></i>
                        Get all Students
                    </div>

                    <div
                        onClick={() => handleComponentSelect('GetStudentsByDepartment')}
                        className={`flex items-center gap-4 text-lg transition-colors font-dosis ${
                            activeLink === "GetStudentsByDepartment" ? "text-white border-l-4 border-blue-500 pl-2" : "text-gray-200 hover:text-white"
                          }`}
                    >
                        <i className="fa-solid fa-paper-plane text-xl"></i>
                        Get Students by department
                    </div>
                    <div
                        onClick={() => handleComponentSelect('GetStudentsBySemester')}
                        className={`flex items-center gap-4 text-lg transition-colors font-dosis ${
                            activeLink === "GetStudentsBySemester" ? "text-white border-l-4 border-blue-500 pl-2" : "text-gray-200 hover:text-white"
                          }`}
                    >
                        <i className="fa-solid fa-paper-plane text-xl"></i>
                        Get Students by Semester
                    </div>
                    <div
                        onClick={() => handleComponentSelect('GetAllFacultiesByDepartment')}
                        className={`flex items-center gap-4 text-lg transition-colors font-dosis ${
                            activeLink === "GetAllFacultiesByDepartment" ? "text-white border-l-4 border-blue-500 pl-2" : "text-gray-200 hover:text-white"
                          }`}
                    >
                        <i className="fa-solid fa-paper-plane text-xl"></i>
                        Get Faculties by department
                    </div>
                    <div
                        onClick={() => handleComponentSelect('GetAllFaculties')}
                        className={`flex items-center gap-4 text-lg transition-colors font-dosis ${
                            activeLink === "GetAllFaculties" ? "text-white border-l-4 border-blue-500 pl-2" : "text-gray-200 hover:text-white"
                          }`}
                    >
                        <i className="fa-solid fa-paper-plane text-xl"></i>
                        Get all Faculties
                    </div>
                   
                   
                    {/* <Link
                        to="/TalkWithAIFaculty" 
                        className="flex items-center gap-4 text-lg text-gray-200 hover:text-white transition-colors font-dosis"
                    >
                        <i className="fa fa-user-plus text-xl"></i>
                        Talk with AI
                    </Link> */}
                </div>
            </div>
        </>
    );
};

export default AdminSidebar;
