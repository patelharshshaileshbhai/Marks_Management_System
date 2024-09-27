import React, { useState } from 'react';
import axios from 'axios';

const GetAllStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to fetch all students
  const fetchAllStudents = async () => {
    const token = localStorage.getItem('adminToken'); // Retrieve token from localStorage

    if (token) { // Ensure token is available before making the request
      setLoading(true); // Set loading to true while fetching data
      try {
        const response = await axios.get('https://marks-management-system.onrender.com/api/v1/admin/getAllStudents', {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the headers
          },
        });

        // Check if the data is present in the response
        if (response.data && response.data.data) {
          setStudents(response.data.data); // Set student data from response
        }
      } catch (error) {
        console.error("Error fetching students:", error);
        setStudents([]); // Reset student data if there is an error
      } finally {
        setLoading(false); // Set loading to false once the request is complete
      }
    }
  };

  return (
    <div className="font-dosis p-4">
      <h2 className="text-2xl font-semibold text-white text-center mb-4">All Students</h2>

      {/* Import All Students Button */}
      <div className="flex justify-center mb-4">
        <button
          onClick={fetchAllStudents}
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-green-700"
        >
          Import All Students
        </button>
      </div>

      {/* Display loading or student data */}
      <div className="overflow-x-auto">
        {loading ? (
          <p className="text-center text-white">Loading...</p>
        ) : students.length > 0 ? ( // Check if students array has data
          <table className="min-w-full table-auto bg-white border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left text-gray-900 font-semibold border border-gray-300">Full Name</th>
                <th className="px-4 py-2 text-left text-gray-900 font-semibold border border-gray-300">Email</th>
                <th className="px-4 py-2 text-left text-gray-900 font-semibold border border-gray-300">Enrollment</th>
                <th className="px-4 py-2 text-left text-gray-900 font-semibold border border-gray-300">Phone</th>
                <th className="px-4 py-2 text-left text-gray-900 font-semibold border border-gray-300">Branch</th>
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
                  <td className="px-4 py-2 text-gray-900 border border-gray-300">{student.branch}</td>
                  <td className="px-4 py-2 text-gray-900 border border-gray-300">{student.semester}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-white">No student found.</p>
        )}
      </div>
    </div>
  );
};

export default GetAllStudents;
