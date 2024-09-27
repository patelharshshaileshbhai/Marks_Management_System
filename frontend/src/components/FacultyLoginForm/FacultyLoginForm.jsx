import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Loader from "../Loader/Loader";
import faculty from "../../assets/faculty.jpg";
import Footer from "../Footer/Footer";
import { useFacultyAuth } from "../context/AuthProvider"; // Importing the faculty auth context

const FacultyLoginForm = () => {
  const [email, setEmail] = useState("");
  const [secureCode, setSecureCode] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useFacultyAuth(); // Get login function from context

  const toastOptions = {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  };
  const handleSignInFaculty = async (event) => {
    event.preventDefault();
    setLoading(true);
  
    try {
      const { data } = await axios.post(
        "https://marks-management-system.onrender.com/api/v1/auth/teacher-login",
        { email, secureCode },
        { headers: { "Content-Type": "application/json" } }
      );
  
      const { token, existedFaculty } = data.data;
  
      // Store faculty name and email in localStorage
      localStorage.setItem("facultyName", existedFaculty.facultyname);
      localStorage.setItem("facultyEmail", existedFaculty.email);
  
      login(token, existedFaculty); // This should set the token in context
      console.log("Login Response:", data);
  
      setLoading(false); // Move setLoading here to ensure it's reset before navigation
      toast.success("Signed in successfully", toastOptions);
      setTimeout(() => {
        navigate("/FacultyDashboard");
      }, 1500); // Navigate after showing toast
  
    } catch (error) {
      setLoading(false); // Ensure loading state is reset
      const errorMessage = error.response?.data?.message || "Failed to sign in. Please try again.";
      toast.error(errorMessage, toastOptions);
      console.error("Error signing in:", error);
    }
  };
  

  return (
    <>
      <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen z-50 bg-[#0C1321] pt-24 lg:pt-32 px-4 lg:px-16 overflow-hidden">
        <Navbar hideSignUpButtons />
        <ToastContainer />
        {loading && <Loader />}
        <div className="bg-white flex flex-col md:flex-row overflow-hidden w-full max-w-4xl rounded-lg border-4 border-[#7286ba] shadow-lg">
          {/* Image Section */}
          <div className="w-full md:w-1/3 h-64 md:h-auto">
            <img
              src={faculty}
              alt="Faculty"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Form Section */}
          <div className="w-full md:w-2/3 p-8 flex flex-col justify-center items-center ">
            <h1 className="text-3xl font-bold mb-4 text-gray-900 font-dosis">Faculty Sign In</h1>
            <form onSubmit={handleSignInFaculty} className="space-y-4 w-full">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg placeholder-gray-700 text-gray-900 font-dosis"
                name="email"
              />
              <input
                type="password"
                placeholder="Secure Code"
                value={secureCode}
                onChange={(e) => setSecureCode(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg placeholder-gray-700 text-gray-900 font-dosis"
                name="secureCode"
              />
              <button
                type="submit"
                className="w-full bg-[#1F3848] text-white py-3 rounded-lg font-dosis"
              >
                Sign In
              </button>
              <p className="text-gray-900 text-center mt-4 font-dosis">
                Are you an Admin?{" "}
                <Link
                  to="/FacultyAdminForm"
                  className="text-blue-500 hover:underline ml-1 font-dosis"
                >
                  Admin
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <div className="mt-9">
        <Footer />
      </div>
    </>
  );
};

export default FacultyLoginForm;
