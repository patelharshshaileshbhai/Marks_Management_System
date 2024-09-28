import React, { useState } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';

const GetStudentsBySemester = () => {
  const [semester, setSemester] = useState('');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  

  // Function to fetch students by semester
  const handleFetchStudents = async () => {
    if (!semester) return;

    const token = localStorage.getItem('adminToken'); // Retrieve token from localStorage

    if (token) {
      setLoading(true);
      try {
        const response = await axios.get(`https://marks-management-system.onrender.com/api/v1/admin/get-semester-students/${semester}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the headers for authorization
          },
        });

        setTimeout(()=>{
          setLoading(false);
          setStudents(response.data.data); // Set student data
        },2000)
        
       
      } catch (error) {
        console.error("Error fetching students:", error);
        setLoading(false); // Stop loading if an error occurs
      }
    } else {
      console.error("No token found in localStorage");
    }
  };

  return (
    <div className="font-dosis p-4">
      {loading && <Loader/>}
      <h2 className="text-2xl font-semibold text-white text-center mb-4">Get Students by Semester</h2>

      {/* Semester Selection Dropdown */}
      <div className="flex justify-center mb-4">
        <select
          id="semester"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg text-black"
        >
          <option value="">--Select Semester--</option>
          {[...Array(8).keys()].map(i => (
            <option key={i + 1} value={i + 1}>{i + 1}</option>
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
                <th className="px-4 py-2 text-left text-gray-900 font-semibold border border-gray-300">Branch</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student._id} className="border-t border-gray-300">
                  <td className="px-4 py-2 text-gray-900 border border-gray-300">{student.fullname}</td>
                  <td className="px-4 py-2 text-gray-900 border border-gray-300">{student.email}</td>
                  <td className="px-4 py-2 text-gray-900 border border-gray-300">{student.enrollment}</td>
                  <td className="px-4 py-2 text-gray-900 border border-gray-300">{student.phone}</td>
                  <td className="px-4 py-2 text-gray-900 border border-gray-300">{student.branch}</td>
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

export default GetStudentsBySemester;
