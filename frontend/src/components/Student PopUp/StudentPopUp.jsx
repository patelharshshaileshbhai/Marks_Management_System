import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../Loader/Loader';
import { useNavigate } from 'react-router-dom';
import { useStudent, StudentLogout } from '../context/AuthProvider';

const StudentPopUp = ({ isOpen, onClose }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const { updateStudentDetails } = useStudent();
    const [studentData, setStudentData] = useState({});
    const [updatedFullName, setUpdatedFullName] = useState('');
    const [updatedEmail, setUpdatedEmail] = useState('');
    const [updatedEnrollment, setUpdatedEnrollment] = useState('');
    const [updatedPhone, setUpdatedPhone] = useState('');
    const [updatedBranch, setUpdatedBranch] = useState('');
    const [updatedSemester, setUpdatedSemester] = useState('');
    const [updatedGender, setUpdatedGender] = useState('');
    const navigate = useNavigate();

    const toastOptions = {
        position: "top-center",
        autoClose: 2000,
        theme: "light",
        transition: Bounce,
    };

    useEffect(() => {
        const fetchStudentProfile = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await axios.get('https://marks-management-system.onrender.com/api/v1/auth/getmyprofile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const { fullName, email, enrollment, phone, branch, semester, gender } = response.data;
                setStudentData(response.data);
                setUpdatedFullName(fullName);
                setUpdatedEmail(email);
                setUpdatedEnrollment(enrollment);
                setUpdatedPhone(phone);
                setUpdatedBranch(branch);
                setUpdatedSemester(semester);
                setUpdatedGender(gender);
            } catch (error) {
                toast.error("Failed to fetch profile details", toastOptions);
            }
        };

        if (isOpen) {
            fetchStudentProfile();
        }
    }, [isOpen]);

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const updatedDetails = {
                fullname: updatedFullName,
                email: updatedEmail,
                enrollment: updatedEnrollment,
                phone: updatedPhone,
                branch: updatedBranch,
                semester: updatedSemester,
                gender: updatedGender,
            };

            const response = await axios.put(
                'https://marks-management-system.onrender.com/api/v1/auth/update-student',
                updatedDetails,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            
            console.log(response);
            
            // Update localStorage and context after successful update
            localStorage.setItem("fullName", updatedFullName);
            localStorage.setItem("studentEmail", updatedEmail);

            updateStudentDetails({
                fullname: updatedFullName,
                email: updatedEmail,
            });

            toast.success("Profile updated successfully", toastOptions);
            setIsEditing(false);
        } catch (error) {
            toast.error("Failed to update profile", toastOptions);
        }
    };

    const handleLogout = async () => {
        const token = localStorage.getItem("token");
        setLoading(true);
        try {
            await axios.post('https://marks-management-system.onrender.com/api/v1/student/logout', {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            localStorage.clear(); // Clear local storage
            setTimeout(() => {
                setLoading(false);
                StudentLogout();
                toast.success("Logged out successfully", toastOptions);
                navigate("/");
            }, 2000);
        } catch (error) {
            console.error('Error during logout:', error);
            toast.error('Logout failed, please try again.', toastOptions);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <ToastContainer />
            {loading && <Loader />}
            <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-8 shadow-lg w-11/12 max-w-md h-auto">
                <h2 className="text-lg font-bold text-white font-dosis">{updatedFullName}</h2>
                <p className="text-sm text-gray-200 font-dosis">{updatedEmail}</p>
                <div className="mt-4 space-y-2">
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="w-full bg-[#204781] text-white rounded py-2 hover:bg-[#2c4f79] transition font-dosis"
                    >
                        Profile
                    </button>
                </div>

                {isEditing && (
                    <form onSubmit={handleSave} className="mt-4 space-y-4">
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={updatedFullName}
                            onChange={(e) => setUpdatedFullName(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg placeholder-gray-700 text-gray-900 font-dosis"
                        />
                        <input 
                        type="email"
                        placeholder="Email"
                        value={updatedEmail}
                        onChange={(e) => setUpdatedEmail(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg placeholder-gray-700 text-gray-900 font-dosis"
                        />
                        <input
                            type="number"
                            placeholder="Enrollment Number"
                            value={updatedEnrollment}
                            onChange={(e) => setUpdatedEnrollment(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg placeholder-gray-700 text-gray-900 font-dosis"
                        />

                        <select
                            value={updatedGender}
                            onChange={(e) => setUpdatedGender(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg placeholder-gray-700 text-gray-900 font-dosis"
                        >
                            <option value="">Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>

                        <input
                            type="number"
                            placeholder="Phone Number"
                            value={updatedPhone}
                            onChange={(e) => setUpdatedPhone(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg placeholder-gray-700 text-gray-900 font-dosis"
                        />
                        <select
                            value={updatedBranch}
                            onChange={(e) => setUpdatedBranch(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg placeholder-gray-700 text-gray-900 font-dosis"
                        >
                            <option value="">Select Branch</option>
                            <option value="CE">Computer Engineering (CE)</option>
                            <option value="IT">Information Technology (IT)</option>
                            <option value="ME">Mechanical Engineering (ME)</option>
                            <option value="CL">Civil Engineering (CL)</option>
                        </select>
                        <select
                            value={updatedSemester}
                            onChange={(e) => setUpdatedSemester(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg placeholder-gray-700 text-gray-900 font-dosis"
                        >
                            <option value="">Select Semester</option>
                            {Array.from({ length: 8 }, (_, i) => (
                                <option key={i + 1} value={i + 1}>
                                    Semester {i + 1}
                                </option>
                            ))}
                        </select>
                        <button
                            type="submit"
                            className="w-full bg-[#1F3848] text-white py-2 rounded-lg font-dosis"
                        >
                            Save
                        </button>
                    </form>
                )}

                <div className="flex justify-center mt-3">
                    <button
                        onClick={handleLogout}
                        className="w-40 bg-[#de0808] text-white rounded py-2 hover:bg-[#e34d4d] transition font-dosis"
                    >
                        Logout
                    </button>
                </div>
                <button className="text-gray-200 underline mt-4 font-dosis" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default StudentPopUp;
