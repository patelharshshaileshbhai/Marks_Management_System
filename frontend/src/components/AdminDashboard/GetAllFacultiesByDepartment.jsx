import React, { useState } from 'react';
import axios from 'axios';

const GetAllFacultiesByDepartment = () => {
  const [department, setDepartment] = useState('');
  const [faculties, setFaculties] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to fetch faculties by department
  const handleFetchFaculties = async () => {
    if (!department) return;

    const token = localStorage.getItem('adminToken'); // Retrieve token from localStorage

    if (token) {
      setLoading(true);
      try {
        const response = await axios.get(`https://marks-management-system.onrender.com/api/v1/admin/get-department-faculties/${department}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the headers for authorization
          },
        });
        console.log(response);
        
        setFaculties(response.data.data); // Set faculties data
        setLoading(false); // Stop loading once data is fetched
      } catch (error) {
        console.error("Error fetching faculties:", error);
        setLoading(false); // Stop loading if an error occurs
      }
    } else {
      console.error("No token found in localStorage");
    }
  };

  return (
    <div className="font-dosis p-4">
      <h2 className="text-2xl font-semibold text-white text-center mb-4">Get All Faculties by Department</h2>

      {/* Department Selection Dropdown */}
      <div className="flex justify-center mb-4">
        <select
          id="branch"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg text-black"
        >
          <option value="">--Select Branch--</option>
          {['IT', 'CE', 'ME', 'CL'].map(branch => (
            <option key={branch} value={branch}>{branch}</option>
          ))}
        </select>
      </div>

      {/* Fetch Faculties Button */}
      <div className="flex justify-center mb-4">
        <button
          onClick={handleFetchFaculties}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
        >
          Fetch Faculties
        </button>
      </div>

      {/* Display loading or faculty data */}
      <div className="overflow-x-auto">
        {loading ? (
          <p className="text-center text-white">Loading...</p>
        ) : faculties.length > 0 ? (
          <table className="min-w-full table-auto bg-white border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left text-gray-900 font-semibold border border-gray-300">Full Name</th>
                <th className="px-4 py-2 text-left text-gray-900 font-semibold border border-gray-300">Email</th>
                {/* <th className="px-4 py-2 text-left text-gray-900 font-semibold border border-gray-300">Department</th> */}
               
              </tr>
            </thead>
            <tbody>
              {faculties.map(faculty => (
                <tr key={faculty._id} className="border-t border-gray-300">
                  <td className="px-4 py-2 text-gray-900 border border-gray-300">{faculty.facultyname}</td>
                  <td className="px-4 py-2 text-gray-900 border border-gray-300">{faculty.email}</td>
                  {/* <td className="px-4 py-2 text-gray-900 border border-gray-300">{faculty.department}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-white">No faculties found.</p>
        )}
      </div>
    </div>
  );
};

export default GetAllFacultiesByDepartment;
