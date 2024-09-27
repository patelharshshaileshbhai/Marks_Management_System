import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useAuth } from "../context/AuthProvider";
import Navbar from "../navbar/Navbar";
import student from "../../assets/student.jpg";
import Footer from "../Footer/Footer";

const StudentForm = () => {
  const [active, setActive] = useState(false); // Toggle between Sign In and Sign Up
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [enrollment, setEnrollment] = useState("");
  const [gender , setGender] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

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

  const handleSignUp = async (event) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address");
      toast.error("Please enter a valid email address", toastOptions);
      return;
    }

    const userData = {
      fullname,
      email,
      enrollment,
      gender,
      phone,
      branch,
      semester,
      password,
    };

    try {
      const response = await axios.post(
        "https://marks-management-system.onrender.com/api/v1/auth/signup",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(response.data.message, toastOptions);
      setTimeout(() => {
        setActive(false);
      }, 2000);
    } catch (error) {
      console.error("Error signing up:", error);
      if (error.response?.status === 409) {
        toast.error(
          "Student with this email or enrollment already exists",
          toastOptions
        );
      }
      // setErrorMessage(
      //     error.response?.data?.message || "An error occurred during signup. Please try again."
      // );
      // toast.error(
      //     error.response?.data?.message || "Failed to create account. Please try again.",
      //     toastOptions
      // );
    }
  };
  const handleSignIn = async (event) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address");
      toast.error("Please enter a valid email address", toastOptions);
      return;
    }

    setLoading(true); // Show loader before sending the request

    try {
      const { data } = await axios.post(
        "https://midsem-mern.onrender.com/api/v1/auth/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { token, student } = data.data;
      localStorage.setItem("token", token);
      localStorage.setItem("fullName", student.fullname);
      localStorage.setItem("studentEmail", student.email);
      localStorage.setItem("studentEnrollment", student.enrollment);
      localStorage.setItem("studentData", JSON.stringify(student));


      // Show loader, then success message, then navigate
      setTimeout(() => {
        setLoading(false);
        toast.success("Logged in successfully", toastOptions);
        setTimeout(() => {
          login(token);
          navigate("/Dashboard");
        }, 1000);
      }, 1000);
    } catch (error) {
      setLoading(false); // Hide loader before showing error

      if (error.response?.status === 404) {
        setTimeout(() => {
          toast.error("Student does not exist", toastOptions);
        }, 2000); // Delay showing the error toast
      } else if (error.response?.status === 401) {
        setTimeout(() => {
          toast.error("Invalid student credentials", toastOptions);
        }, 2000); // Delay showing the error toast
      } else {
        setTimeout(() => {
          toast.error(
            error.response?.data?.message ||
              "Failed to sign in. Please try again.",
            toastOptions
          );
        }, 2000); // Delay showing the error toast
      }

      console.error("Error signing in:", error);
    }
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@saffrony\.ac\.in$/;
    return emailPattern.test(email);
  };

  return (
    <>
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen z-50 bg-[#0C1321] pt-24 lg:pt-32 px-4 lg:px-16 overflow-hidden">
      <Navbar hideSignUpButtons />
      <ToastContainer {...toastOptions} />
      {loading && <Loader />}

      {/* Main Container with white background and rounded corners */}
      <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-4xl bg-white rounded-lg border-4 border-[#2a6ca1] shadow-lg p-6 lg:p-10 overflow-hidden">
        {/* Image Section */}
        <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
          <img
            src={student}
            alt="Description"
            className="w-full h-auto lg:ml-8 rounded-lg"
          />
        </div>

        {/* Form Section */}
        <div className="flex flex-col w-full lg:w-1/2 max-w-sm">
          {/* Sign In Form */}
          <div
            className={`flex flex-col items-center ${active ? "hidden" : ""}`}
          >
            <h1 className="text-2xl font-extrabold mb-4 text-gray-900 font-dosis">Sign In</h1>
            <form onSubmit={handleSignIn} className="space-y-4 w-full">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg placeholder-gray-700 text-gray-900 font-dosis"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg placeholder-gray-700 text-gray-900 font-dosis"
              />
              <button
                type="submit"
                className="w-full bg-[#1F3848] text-white py-2 rounded-lg font-dosis"
              >
                Sign In
              </button>
            </form>
            <div className="mt-4 text-center">
              <p className="text-gray-700 font-dosis">
                Don't have an account?{" "}
                <a
                  href="#"
                  onClick={() => setActive(true)}
                  className="text-blue-500"
                >
                  Create account
                </a>
              </p>
            </div>
            {errorMessage && (
              <div className="text-red-500 mt-4">{errorMessage}</div>
            )}
          </div>

          {/* Sign Up Form */}
          <div
            className={`flex flex-col items-center ${!active ? "hidden" : ""}`}
          >
            <h1 className="text-2xl font-bold mb-4 text-gray-900 font-dosis">
              Create Account
            </h1>
            <form onSubmit={handleSignUp} className="space-y-4 w-full">
              <input
                type="text"
                placeholder="Full Name"
                value={fullname}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg placeholder-gray-700 text-gray-900 font-dosis"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg placeholder-gray-700 text-gray-900 font-dosis"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg placeholder-gray-700 text-gray-900 font-dosis"
              />
              {/* Additional Fields */}
              <input
                type="number"
                placeholder="Enrollment"
                value={enrollment}
                onChange={(e) => setEnrollment(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg placeholder-gray-700 text-gray-900 font-dosis"
              />
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg placeholder-gray-700 text-gray-900 font-dosis"
              >
                <option value="">Gender</option>
                <option value="CE">Male</option>
                <option value="IT">Female</option>
              </select>

              <input
                type="number"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg placeholder-gray-700 text-gray-900 font-dosis"
              />
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
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
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
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
                Create Account
              </button>
            </form>
            <div className="mt-4 text-center">
              <p className="text-gray-700 font-dosis">
                Already have an account? {" "}
                <a
                  href="#"
                  onClick={() => setActive(false)}
                  className="text-blue-500 font-dosis"
                >
                  Sign In
                </a>
              </p>
            </div>
            {errorMessage && (
              <div className="text-red-500 mt-4">{errorMessage}</div>
            )}
          </div>
        </div>
      </div>
      
    </div>
    <div className="mt-9">
    <Footer/>
  </div>
    </>
  );
};

export default StudentForm;
