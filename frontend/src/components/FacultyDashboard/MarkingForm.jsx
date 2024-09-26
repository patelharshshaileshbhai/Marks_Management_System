import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

const MarkingForm = () => {
    const [branch, setBranch] = useState('');
    const [semester, setSemester] = useState('');
    const [subject, setSubject] = useState('');
    const [file, setFile] = useState(null); // Initialize file as null
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const toastOptions = {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
    
        if (!branch || !semester || !subject || !file) {
            setError('All fields are required');
            toast.error("All fields are required", toastOptions);
            return;
        }
    
        const formData = new FormData();
        formData.append('branch', branch);
        formData.append('semester', semester);
        formData.append('subject', subject);
        formData.append('file', file);
    
        const token = localStorage.getItem('facultyToken');
        if (!token) {
            toast.error("Unauthorized: No token found", toastOptions);
            return;
        }
    
        // Display loading toast
        const loadingToastId = toast.loading("Importing marks, please wait...", toastOptions);
    
        try {
            const response = await axios.post('http://localhost:8000/api/v1/faculty/import-marks', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            });
    
            if (response.status === 200) {
                toast.update(loadingToastId, {
                    render: "Marks imported successfully",
                    type: "success",
                    isLoading: false,
                    autoClose: 2000, // You can adjust the auto-close duration
                },toastOptions);
    
                setTimeout(() => {
                    navigate("/FacultyDashboard"); // Redirect to home page
                }, 2000);
            } else {
                toast.update(loadingToastId, {
                    render: "Failed to import marks",
                    type: "error",
                    isLoading: false,
                    autoClose: 2000,
                },toastOptions);
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            toast.update(loadingToastId, {
                render: "Error uploading file",
                type: "error",
                isLoading: false,
                autoClose: 2000,
            },toastOptions);
        }
    };
    

    return (
        <div className="mt-10 p-6 bg-white shadow-md rounded-md">
            <ToastContainer />
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 font-dosis">Put Marking</h2>
            <form onSubmit={handleSubmit}>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="mb-6">
                    <label htmlFor="branch" className="block text-lg font-medium text-gray-700 mb-2 font-dosis">Branch</label>
                    <select
                        id="branch"
                        value={branch}
                        onChange={(e) => setBranch(e.target.value)}
                        className="w-full p-3 border-2 border-gray-300 rounded-lg text-gray-900 font-dosis"
                    >
                        <option value="">Select Branch</option>
                        <option value="CE">CE</option>
                        <option value="IT">IT</option>
                        <option value="ME">ME</option>
                        <option value="CL">CL</option>
                    </select>
                </div>

                <div className="mb-6">
                    <label htmlFor="semester" className="block text-lg font-medium text-gray-700 mb-2 font-dosis">Semester</label>
                    <select
                        id="semester"
                        value={semester}
                        onChange={(e) => setSemester(e.target.value)}
                        className="w-full p-3 border-2 border-gray-300 rounded-lg text-gray-900 font-dosis"
                    >
                        <option value="">Select Semester</option>
                        {[...Array(8).keys()].map(i => (
                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-6">
                    <label htmlFor="subject" className="block text-lg font-medium text-gray-700 mb-2 font-dosis">Subject</label>
                    <input
                        type="text"
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full p-3 border-2 border-gray-300 rounded-lg text-gray-900 font-dosis"
                        placeholder="Enter subject"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="file" className="block text-lg font-medium text-gray-700 mb-2 font-dosis">Upload Marks (CSV)</label>
                    <input
                        type="file"
                        id="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="w-full p-3 border-2 border-gray-300 rounded-lg text-gray-900 font-dosis"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-dosis"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default MarkingForm;