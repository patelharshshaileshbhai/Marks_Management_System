import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';

const GetStudentsByDepartment = () => {
  const [branch, setBranch] = useState('');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to fetch students by branch
  const handleFetchStudents = async () => {
    if (!branch) return;

    const token = localStorage.getItem('adminToken'); // Retrieve token from localStorage

    if (token) { // Ensure token is available before making the request
      setLoading(true); // Set loading to true while fetching data
      try {
        const response = await axios.get(`https://marks-management-system.onrender.com/api/v1/admin/get-branch-students/${branch}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the headers
          },
        });

        setTimeout(()=>{
          setLoading(false); // Set loading to false after fetching data
          setStudents(response.data.data); // Set the student data
        },2000)
       
        
      } catch (error) {
        console.error("Error fetching students:", error);
        setLoading(false); // Stop loading even if there's an error
      }
    } else {
      console.error("No token found in localStorage");
    }
  };

  return (
    <div className="font-dosis p-4">
      {loading && <Loader/>}
      <h2 className="text-2xl font-semibold text-white text-center mb-4">Get Students by Department</h2>

      {/* Branch Selection Dropdown */}
      <div className="flex justify-center mb-4">
        <select
          id="branch"
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg text-black"
        >
          <option value="">--Select Branch--</option>
          {['IT', 'CE', 'ME', 'CL'].map(branch => (
            <option key={branch} value={branch}>{branch}</option>
          ))}
        </select>
      </div>

      {/* Fetch Students Button */}
      <div className="flex justify-center mb-4">
        <button
          onClick={handleFetchStudents}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
        >
          Fetch Students
        </button>
      </div>

      {/* Display loading or student data */}
      <div className="overflow-x-auto">
        {loading ? (
          <p className="text-center text-white">Loading...</p>
        ) : students.length > 0 ? (
          <table className="min-w-full table-auto bg-white border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left text-gray-900 font-semibold border border-gray-300">Full Name</th>
                <th className="px-4 py-2 text-left text-gray-900 font-semibold border border-gray-300">Email</th>
                <th className="px-4 py-2 text-left text-gray-900 font-semibold border border-gray-300">Enrollment</th>
                <th className="px-4 py-2 text-left text-gray-900 font-semibold border border-gray-300">Phone</th>
                <th className="px-4 py-2 text-left text-gray-900 font-semibold border border-gray-300">Semester</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id} className="border-t border-gray-300">
                  <td className="px-4 py-2 text-gray-900 border border-gray-300">{student.fullname}</td>
                  <td className="px-4 py-2 text-gray-900 border border-gray-300">{student.email}</td>
                  <td className="px-4 py-2 text-gray-900 border border-gray-300">{student.enrollment}</td>
                  <td className="px-4 py-2 text-gray-900 border border-gray-300">{student.phone}</td>
                  <td className="px-4 py-2 text-gray-900 border border-gray-300">{student.semester}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-white">No students found.</p>
        )}
      </div>
    </div>
  );
};

export default GetStudentsByDepartment;
