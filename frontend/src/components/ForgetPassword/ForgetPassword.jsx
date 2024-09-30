import React, { useState } from 'react';
import { toast, ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../Loader/Loader';
import forgotpassword from '../../assets/forgot_password.png';
import axios from 'axios'; 
import Navbar from "../navbar/Navbar";

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // Toast options
  const toastOptions = {
    position: 'top-center',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    transition: Bounce,
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();

 
   
    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address");
      toast.error("Please enter a valid email address", toastOptions);
      return;
    }

    setLoading(true);

    try {
      
      const response = await axios.post('https://marks-management-system.onrender.com/api/v1/auth/forgot-password', { email });

      
      if (response.data.success) {
        toast.success('Reset link sent to your email', toastOptions);
      } else {
        toast.error(response.data.message || 'Failed to send reset link', toastOptions);
      }
    } catch (error) {
      
      toast.error(error.response?.data?.message || 'An error occurred', toastOptions);
    } finally {
      setLoading(false);
    }
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@saffrony\.ac\.in$/;
    return emailPattern.test(email);
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen z-50 bg-[#0C1321] pt-24 lg:pt-32 px-4 lg:px-16 overflow-hidden">
      <ToastContainer />
      {loading && <Loader />}
      <Navbar hideSignUpButtons />
      <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-4xl bg-white rounded-lg border-4 border-[#2a6ca1] shadow-lg p-6 lg:p-10 overflow-hidden">
        
        <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
          <img src={forgotpassword} alt="Forget Password" className="w-full h-auto lg:ml-8 rounded-lg" />
        </div>

        
        <div className="flex flex-col w-full lg:w-1/2 max-w-sm">
          <h1 className="text-2xl font-extrabold mb-4 text-gray-900 font-dosis">Forgot Password</h1>
          <form onSubmit={handleForgotPassword} className="space-y-4 w-full">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg placeholder-gray-700 text-gray-900 font-dosis"
            />

            <button
              type="submit"
              className="w-full bg-[#1F3848] text-white py-2 rounded-lg font-dosis"
              disabled={loading} // Disable button when loading
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
            {errorMessage && (
              <div className="text-red-500 mt-4">{errorMessage}</div>
            )}
        
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
