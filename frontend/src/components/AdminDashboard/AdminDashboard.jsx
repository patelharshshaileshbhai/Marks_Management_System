import React, { useState } from "react";

const AdminDashboard = () => {
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleAdminSignIn = async (event) => {
    event.preventDefault();
    console.log("Sign in attempted with:", adminEmail, adminPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#282c34] to-[#1c1e24] text-gray-100">
      {/* Top Navigation */}
      <nav className="bg-[#21252b] p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          <div className="flex space-x-6">
            <NavItem text="Home" icon="🏠" />
            <NavItem text="Settings" icon="⚙️" />
            <NavItem text="Logout" icon="🚪" />
          </div>
        </div>
      </nav>

      <div className="container mx-auto mt-12 px-4 flex flex-col md:flex-row">
        {/* Sidebar with Avatar */}
        <div className="w-full md:w-1/4 mb-8 md:mb-0 md:pr-8">
          <div className="bg-[#21252b] rounded-xl p-6 text-center shadow-xl transform hover:scale-105 transition duration-300">
            <div className="w-32 h-32 mx-auto bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
              <svg
                className="w-20 h-20 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                ></path>
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-2 text-white">
              Admin Name
            </h2>
            <p className="text-gray-400">admin@example.com</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-3/4">
          <div className="bg-[#21252b] rounded-xl p-8 shadow-xl">
            <h1 className="text-3xl font-bold mb-8 text-white text-center">
              Welcome, Admin
            </h1>
            <form onSubmit={handleAdminSignIn} className="space-y-6">
              <input
                type="email"
                placeholder="Email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                required
                className="w-full p-4 bg-[#282c34] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                name="email"
              />
              <input
                type="password"
                placeholder="Password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                required
                className="w-full p-4 bg-[#282c34] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                name="password"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign In
              </button>
            </form>

            <p className="text-gray-400 text-center mt-8">
              Are you a Faculty?{" "}
              <a
                href="/faculty-login"
                className="text-blue-400 hover:underline"
              >
                Faculty Login
              </a>
            </p>

            {errorMessage && (
              <div className="text-red-400 mt-4 text-center">
                {errorMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const NavItem = ({ text, icon }) => (
  <a
    href="#"
    className="flex items-center space-x-2 text-gray-300 hover:text-white transition duration-300"
  >
    <span>{icon}</span>
    <span>{text}</span>
  </a>
);

export default AdminDashboard;
