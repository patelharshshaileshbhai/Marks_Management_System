import React, { createContext, useContext, useState, useEffect } from 'react';

// Student Auth Context
const AuthContext = createContext();

// Custom hook to use the student context
export const useAuth = () => useContext(AuthContext);

// Provider component for student authentication
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const token = localStorage.getItem("token");
        return !!token; // Returns true if token exists, false otherwise
    });

    const login = (token, student) => {
        setIsAuthenticated(true);
        localStorage.setItem("token", token); // Store the student token
        localStorage.setItem("studentData", JSON.stringify(student)); // Store student data
    };

    const StudentLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem("token"); // Clear the student token
        localStorage.removeItem("studentData"); // Clear the student data
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token); // Update state based on token presence
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, StudentLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Faculty Auth Context
const FacultyAuthContext = createContext();

// Custom hook to use the faculty context
export const useFacultyAuth = () => useContext(FacultyAuthContext);

// Provider component for faculty authentication
export const FacultyAuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const token = localStorage.getItem("facultyToken");
        return !!token; // Returns true if token exists, false otherwise
    });

    const login = (token, facultyData) => {
        setIsAuthenticated(true);
        localStorage.setItem("facultyToken", token); // Ensure this line is reached
        localStorage.setItem("facultyData", JSON.stringify(facultyData)); // And this too
    };
    

    const FacultyLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem("facultyToken"); // Clear the faculty token
        localStorage.removeItem("facultyData"); // Clear the faculty data
        localStorage.removeItem("facultyEmail");
        localStorage.removeItem("facultyName");
    };

    useEffect(() => {
        const token = localStorage.getItem("facultyToken");
        setIsAuthenticated(!!token); // This should correctly update the state
    }, []);
    

    return (
        <FacultyAuthContext.Provider value={{ isAuthenticated, login, FacultyLogout }}>
            {children}
        </FacultyAuthContext.Provider>
    );
};




// Admin Auth Context
const AdminAuthContext = createContext();

// Custom hook to use the faculty context
export const useAdminAuth = () => useContext(AdminAuthContext);

// Provider component for faculty authentication
export const AdminAuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const token = localStorage.getItem("adminToken");
        return !!token; // Returns true if token exists, false otherwise
    });

    const login = (token, adminData) => {
        setIsAuthenticated(true);
        localStorage.setItem("adminToken", token); // Ensure this line is reached
        localStorage.setItem("adminData", JSON.stringify(adminData)); // And this too
    };
    

    const AdminLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem("adminToken"); // Clear the admin token
        localStorage.removeItem("adminData"); // Clear the admin data
        localStorage.removeItem("adminEmail");
    };

    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        setIsAuthenticated(!!token); // This should correctly update the state
    }, []);
    

    return (
        <AdminAuthContext.Provider value={{ isAuthenticated, login, AdminLogout}}>
            {children}
        </AdminAuthContext.Provider>
    );
};





// StudentContext.js

// Create a context
const StudentContext = createContext();

// Custom hook to access the student context
export const useStudent = () => useContext(StudentContext);

// Provider component
export const StudentProvider = ({ children }) => {
    const [studentDetails, setStudentDetails] = useState({
        fullname: localStorage.getItem("fullName") || "",
        email: localStorage.getItem("studentEmail") || "",
        enrollment: localStorage.getItem("studentEnrollment") || "",
        phone: localStorage.getItem("studentPhone") || "",
        branch: localStorage.getItem("studentBranch") || "",
        semester: localStorage.getItem("studentSemester") || "",
        gender: localStorage.getItem("studentGender") || "",
    });

    const updateStudentDetails = (details) => {
        // Update both state and localStorage
        setStudentDetails(details);
        if (details.fullname) localStorage.setItem("fullName", details.fullname);
        if (details.email) localStorage.setItem("studentEmail", details.email);
        if (details.enrollment) localStorage.setItem("studentEnrollment", details.enrollment);
        if (details.phone) localStorage.setItem("studentPhone", details.phone);
        if (details.branch) localStorage.setItem("studentBranch", details.branch);
        if (details.semester) localStorage.setItem("studentSemester", details.semester);
        if (details.gender) localStorage.setItem("studentGender", details.gender);
    };

    return (
        <StudentContext.Provider value={{ studentDetails, updateStudentDetails }}>
            {children}
        </StudentContext.Provider>
    );
};