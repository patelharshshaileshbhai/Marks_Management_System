import React, { useState } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';

const GetStudentByEnrollment = () => {
  const [enrollment, setEnrollment] = useState('');
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFetchStudent = async () => {
    const token = localStorage.getItem('adminToken'); // Retrieve token from localStorage

    if (enrollment && token) { // Ensure enrollment and token are available before making the request
      setLoading(true); // Set loading to true while fetching data
      try {
        const response = await axios.get(
          `https://marks-management-system.onrender.com/api/v1/admin/getstudentbyenrolment/${enrollment}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Pass the token in the headers
            },
          }
        );
        setTimeout(()=>{
          setLoading(false)
          setStudent(response.data.data);
        },2000)
       
      } catch (error) {
        console.error('Error fetching student:', error);
        setStudent(null); // Reset the student data if there is an error
      } finally {
        setLoading(false); // Set loading to false once the request is complete
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent default Enter key behavior
      handleFetchStudent(); // Call the function to fetch student
    }
  };

  return (
    <div className="font-dosis p-4">
      {loading && <Loader/>}
      <h1 className="text-2xl font-semibold text-white text-center mb-4">Search Student by Enrollment</h1>

      {/* Input for enrollment number */}
      <div className="flex justify-center space-x-4 mb-4">
        <div>
          <label htmlFor="enrollment" className="block text-white text-center font-semibold mx-2">
            Enrollment Number:
          </label>
          <input
            id="enrollment"
            type="text"
            value={enrollment}
            onChange={(e) => setEnrollment(e.target.value)}
            onKeyDown={handleKeyDown} // Add onKeyDown event
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-900"
            placeholder="Enter Enrollment Number"
          />
        </div>

        {/* Search Button */}
        <div className="flex items-end">
          <button
            onClick={handleFetchStudent}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
          >
            Search
          </button>
        </div>
      </div>

      {/* Display loading or student data */}
      <div className="overflow-x-auto">
        {loading ? (
          <p className="text-center text-white">Loading...</p>
        ) : student ? (
          <table className="min-w-full table-auto bg-white border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left text-gray-900 font-semibold border border-gray-300">Full Name</th>
                <th className="px-4 py-2 text-left text-gray-900 font-semibold border border-gray-300">Email</th>
                <th className="px-4 py-2 text-left text-gray-900 font-semibold border border-gray-300">Gender</th>
                <th className="px-4 py-2 text-left text-gray-900 font-semibold border border-gray-300">Phone</th>
                <th className="px-4 py-2 text-left text-gray-900 font-semibold border border-gray-300">Semester</th>
                <th className="px-4 py-2 text-left text-gray-900 font-semibold border border-gray-300">Branch</th>
              </tr>
            </thead>
            <tbody>
              <tr key={student._id} className="border-t border-gray-300">
                <td className="px-4 py-2 text-gray-900 border border-gray-300">{student.fullname}</td>
                <td className="px-4 py-2 text-gray-900 border border-gray-300">{student.email}</td>
                <td className="px-4 py-2 text-gray-900 border border-gray-300">{student.gender}</td>
                <td className="px-4 py-2 text-gray-900 border border-gray-300">{student.phone}</td>
                <td className="px-4 py-2 text-gray-900 border border-gray-300">{student.semester}</td>
                <td className="px-4 py-2 text-gray-900 border border-gray-300">{student.branch}</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <p className="text-center text-white">No student found.</p>
        )}
      </div>
    </div>
  );
};

export default GetStudentByEnrollment;
