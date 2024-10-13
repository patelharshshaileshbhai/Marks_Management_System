import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
// import FacultyLoginForm from "../FacultyLoginForm/FacultyLoginForm";
import Loader from "../Loader/Loader";
import Admin_sign_in from "../../assets/Admin_sign_in.png" 
import Footer from "../Footer/Footer";
import { useAdminAuth } from "../context/AuthProvider";

const FacultyAdminForm = () => {
  // const navigate = useNavigate();
  // const [active, setActive] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const {login} = useAdminAuth()
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
    transition: Bounce, 
};
  // const handleFacultySignUp = async (event) => {
  //   event.preventDefault();
  
  //   // Validate email
  //   if (!validateEmail(email)) {
  //     setErrorMessage("Please enter a valid email address");
  //     toast.error("Please enter a valid email address", toastOptions);
  //     return;
  //   }
  
  //   const facultyData = {
  //     facultyname,
  //     email,
  //     department,
  //     secureCode,
  //   };
  
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:8000/api/v1/auth/teacher-signup",
  //       facultyData,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  
  //     console.log("Faculty account created successfully:", response.data);
  
  //     // Store faculty name and email in localStorage
  //     localStorage.setItem("facultyName", response.data.facultyname);
  //     localStorage.setItem("facultyEmail", response.data.email);
  
  //     toast.success("Faculty account created successfully", toastOptions);
  //     setTimeout(() => {
  //       navigate("/FacultyDashboard");
  //     }, 3000);
  //   } catch (error) {
  //     console.error("Error signing up:", error);
  //     setErrorMessage(
  //       error.response?.data?.message ||
  //       "An error occurred during signup. Please try again."
  //     );
  //     toast.error(
  //       error.response?.data?.message ||
        
  //       toastOptions.setErrorMessage
  //     );
  //   }
  // };
  
  

  const handleAdminSignUp = async (event) => {
    event.preventDefault();

    if (!validateEmail(adminEmail)) {
        setErrorMessage("Please enter a valid email address");
        toast.error("Please enter a valid email address", toastOptions);
        return;
    }

    setLoading(true);

    try {
        const response = await axios.post(
            "https://marks-management-system.onrender.com/api/v1/auth/admin-login",
            { email: adminEmail, password: adminPassword },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        console.log({ adminEmail, adminPassword });

        const { token } = response.data.data;
        localStorage.setItem("adminToken", token);
        localStorage.setItem("adminEmail",adminEmail)
        login(token);
        setTimeout(() => {
            setLoading(false);
            toast.success("Signed in Successfully", toastOptions);
            setTimeout(() => {
                navigate("/AdminDashboard");
            }, 2000);
        }, 1500);

    } catch (error) {
        setLoading(false);

        if (error.response) {
            const { status } = error.response;

            if (status === 400) {
                setTimeout(() => {
                    toast.error("All fields are required", toastOptions);
                }, 2000);
            } else if (status === 409) {
                setTimeout(() => {
                    toast.error("Admin not found", toastOptions);
                }, 2000);
            } else if (status === 401) {
                setTimeout(() => {
                    toast.error("Invalid credentials", toastOptions);
                }, 2000);
            } else {
                setTimeout(() => {
                    toast.error(
                        error.response.data.message || "An error occurred. Please try again.",
                        toastOptions
                    );
                }, 2000);
            }
        }

        console.error("Error in creating Admin account:", error);
    }
};




  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  return (
    <>
     <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen z-50 bg-[#0C1321] pt-24 lg:pt-32 px-4 lg:px-16 overflow-hidden">
      <Navbar hideSignUpButtons/>
      <ToastContainer {...toastOptions} />
      {loading && <Loader />}

      <div className="bg-white flex flex-col md:flex-row overflow-hidden w-full max-w-4xl rounded-lg border-4 border-[#7286ba] shadow-lg">
      {/* Image Section */}
      <div className="w-full md:w-1/3 h-64 md:h-auto">
        <img
          src={Admin_sign_in} // Replace with your image URL or local path
          alt="Faculty"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full md:w-2/3 p-8 flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 text-center font-dosis">
          Admin Sign In
        </h1>
        <form onSubmit={handleAdminSignUp} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 font-dosis"
            name="email"
          />
          <p className="font-dosis text-gray-900 text-sm">Admin Email : akshay.kansara@saffrony.ac.in</p>
          <input
            type="password"
            placeholder="Password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 font-dosis"
            name="password"
          />
          <p className="font-dosis text-gray-900 text-sm">Admin Password : 60003467</p>
          <button
            type="submit"
            className="w-full bg-[#1F3848] text-white py-3 rounded-lg font-dosis"
          >
            Sign In
          </button>
  
          {/* Link to Faculty Login */}
          <p className="text-gray-900 text-center mt-4 font-dosis">
            Are you a Faculty?{" "}
            <Link
              to="/FacultyLoginForm"
              className="text-blue-500 hover:underline ml-1 font-dosis"
            >
              Faculty
            </Link>
          </p>
        </form>
  
        {/* Error Message */}
        {errorMessage && <div className="text-red-500 mt-4 text-center">{errorMessage}</div>}
      </div>
    </div>
    </div>
     <div className="mt-9">
     <Footer/>
   </div>
   </>
  );
  
};

export default FacultyAdminForm;
