import React, { useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa'; 
import { toast, ToastContainer } from 'react-toastify'; 
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css'; 
import {useNavigate} from "react-router-dom"
import Loader from '../Loader/Loader';

const SearchBar = ({ placeholder, onStudentData }) => {
  const [searchText, setSearchText] = useState('');
  const [showClearButton, setShowClearButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const toastOptions = {
    position: "top-center",
    autoClose: 2000, 
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };

  const handleSearchClick = async () => {
    setShowClearButton(true);

    if (searchText.length !== 12) {
        toast.error('Incorrect enrollment number: must be exactly 12 characters', toastOptions);
        return;
    }

    const storedEnrollment = localStorage.getItem('studentEnrollment');

    if (searchText === storedEnrollment) {
        // Show the loader before doing anything else
        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setLoading(false); // Hide the loader if there's no token
                toast.error('Unauthorized: No token found');
                return;
            }

            // Simulate a delay for loading
            setTimeout(async () => {
                try {
                    const response = await axios.get(`https://midsem-mern.onrender.com/api/v1/student/getmymarks/${searchText}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (response.status === 200) {
                        const { branch, semester, subject, marks } = response.data.data[0];

                        // Pass the fetched data to the parent component
                        onStudentData({
                            branch,
                            semester,
                            subject,
                            marks,
                        });

                        // Hide the loader after fetching marks
                        setLoading(false);
                        toast.success('Marks fetched successfully', toastOptions);

                        // Navigate to the dashboard after showing the message
                        setTimeout(() => {
                            navigate('/Dashboard');
                        }, 1000); // Short delay before navigating to the dashboard

                    } else {
                        setLoading(false);
                        toast.error('Failed to fetch marks');
                    }
                } catch (error) {
                    setLoading(false);
                    console.error('Error fetching marks:', error);
                    toast.error('Error fetching marks');
                }
            }, 1500); // Wait for 1500ms before processing the request

        } catch (error) {
            setLoading(false); // Hide loader in case of unexpected error
            console.error('Unexpected error:', error);
            toast.error('An unexpected error occurred');
        }
    } else {
        toast.error("You can't enter someone else's enrollment number", toastOptions);
    }
};

  

  const handleClear = () => {
    setSearchText('');
    setShowClearButton(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent default Enter key behavior
      handleSearchClick();
    }
  };

  return (
    <div>
      <div className="relative w-full flex justify-center items-center mt-8">
        <input
          type="text"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            if (e.target.value.length === 0) {
              setShowClearButton(false); // Hide X icon if text is cleared
            }
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full md:w-3/4 lg:w-1/2 px-4 py-3 rounded-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-700 text-gray-900 pr-12" // Ensure sufficient padding-right
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          {searchText && (
            <>
              {!showClearButton ? (
                <FaSearch 
                  className="text-gray-500 cursor-pointer"
                  onClick={handleSearchClick}
                />
              ) : (
                <button
                  onClick={handleClear}
                  className="text-gray-500"
                >
                  <FaTimes />
                </button>
              )}
            </>
          )}
        </div>
      </div>
      <ToastContainer /> 
      {loading && <Loader />}
    </div>
  );
};

export default SearchBar;
