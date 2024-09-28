import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';

const GetAllStudentsBySemesterAndBranch = () => {
  const [students, setStudents] = useState([]);
  const [branch, setBranch] = useState('');
  const [semester, setSemester] = useState('');
  const [loading , setLoading] = useState(false)

  const handleFetchStudents = async () => {
    const token = localStorage.getItem('adminToken'); // Retrieve token from localStorage

    if (branch && semester && token) { // Only fetch if branch, semester, and token are available
      setLoading(true)
      try {
        const response = await axios.get(
          `https://marks-management-system.onrender.com/api/v1/admin/get-students/${branch}/${semester}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Pass the token in the headers
            },
          }
        );
        setTimeout(()=>{
          setLoading(false)
          setStudents(response.data.data);
        },2000)
        
      } catch (error) {
        console.error("Error fetching students:", error.response.data);
      }
    }
  };

  return (
    <div className="font-dosis p-4">
      {loading && <Loader/>}
      <h1 className="text-2xl font-semibold text-white text-center mb-4">Students List</h1>

      {/* Dropdowns for selecting Branch and Semester */}
      <div className="flex justify-center space-x-4 mb-4">
        <div>
          <label htmlFor="branch" className="block text-white text-center font-semibold mx-2">Branch:</label>
          <select
            id="branch"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-900"
          >
            <option value="">Select Branch</option>
            <option value="IT">IT</option>
            <option value="CE">CE</option>
            <option value="ME">ME</option>
            <option value="CL">CL</option>
          </select>
        </div>
        <div>
          <label htmlFor="semester" className="block text-white text-center font-semibold">Semester:</label>
          <select
            id="semester"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-900"
          >
            <option value="">Select Semester</option>
            {[...Array(8)].map((_, i) => (
              <option key={i} value={i + 1}>{i + 1}</option>
            ))}
          </select>
        </div>
        {/* Search Button */}
        <div className="flex items-end">
          <button
            onClick={handleFetchStudents}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
          >
            Search
          </button>
        </div>
      </div>

      {/* Table to display the fetched students */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left text-gray-900 font-semibold border border-gray-300">Full Name</th>
              <th className="px-4 py-2 text-left text-gray-900 font-semibold border border-gray-300">Email</th>
              <th className="px-4 py-2 text-left text-gray-900 font-semibold border border-gray-300">Enrollment</th>
              <th className="px-4 py-2 text-left text-gray-900 font-semibold border border-gray-300">Phone</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student) => (
                <tr key={student._id} className="border-t border-gray-300">
                  <td className="px-4 py-2 text-gray-900 border border-gray-300">{student.fullname}</td>
                  <td className="px-4 py-2 text-gray-900 border border-gray-300">{student.email}</td>
                  <td className="px-4 py-2 text-gray-900 border border-gray-300">{student.enrollment}</td>
                  <td className="px-4 py-2 text-gray-900 border border-gray-300">{student.phone}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-2 text-center text-gray-900 border border-gray-300" colSpan="4">
                  No students found for the selected branch and semester.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GetAllStudentsBySemesterAndBranch;
