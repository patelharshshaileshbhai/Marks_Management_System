// import React from 'react';

// const MarkingForm = () => {
//   return (
//     <div className="mt-10 p-6 bg-white shadow-md rounded-md">
//       <h2 className="text-2xl font-bold mb-6 text-center placeholder-gray-700 text-gray-900">Put Marking</h2>
//       <form>
//         <div className="mb-6">
//           <label
//             htmlFor="branch"
//             className="block text-lg font-medium text-gray-700 mb-2 placeholder-gray-700 text-gray-900"
//           >
//             Branch
//           </label>
//           <select
//             id="branch"
//             name="branch"
//             className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-700 text-gray-900"
//           >
//             <option value="">Select Branch</option>
//             <option value="CE">CE</option>
//             <option value="IT">IT</option>
//             <option value="ME">ME</option>
//             <option value="CL">CL</option>
//           </select>
//         </div>
//         <div className="mb-6">
//           <label
//             htmlFor="semester"
//             className="block text-lg font-medium text-gray-700 mb-2 placeholder-gray-700 text-gray-900"
//           >
//             Semester
//           </label>
//           <select
//             id="semester"
//             name="semester"
//             className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-700 text-gray-900"
//           >
//             <option value="">Select Semester</option>
//             <option value="1">1</option>
//             <option value="2">2</option>
//             <option value="3">3</option>
//             <option value="4">4</option>
//             <option value="5">5</option>
//             <option value="6">6</option>
//             <option value="7">7</option>
//             <option value="8">8</option>
//           </select>
//         </div>

//         <div className='mb-6'>
//           <label htmlFor="subject" className='block text-lg font-medium text-gray-700 mb-2 placeholder-gray-700 text-gray-900'>
//             Subject
//           </label>
//           <input
//                             type="text"
//                             placeholder="Enter your Subject Name"
//                             value={subject}
//                             onChange={(e) => setSubject(e.target.value)}
//                             required
//                             className="w-full p-3 border border-gray-300 rounded-lg placeholder-gray-700 text-gray-900"
//                             name='subject'
//                         />
//         </div>
        // <div className="mb-6">
        //   <label
        //     htmlFor="fileUpload"
        //     className="block text-lg font-medium text-gray-700 mb-2 placeholder-gray-700 text-gray-900"
        //   >
        //     Upload File
        //   </label>
        //   <input
        //     type="file"
        //     id="fileUpload"
        //     name="fileUpload"
        //     className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-700 text-gray-900"
        //   />
        // </div>
//         <button
//           type="submit"
//           className="w-full bg-[#000000] text-white p-3 rounded-lg hover:bg-[#1a1a1a] transition duration-300"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default MarkingForm;



// import React, { useState } from 'react';
// import axios from 'axios';

// const MarkingForm = () => {
//   const [branch, setBranch] = useState('');
//   const [semester, setSemester] = useState('');
//   const [subject, setSubject] = useState('');
//   const [enrolment, setEnrolment] = useState('');
//   const [name, setName] = useState('');
//   const [marks, setMarks] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const markingData = {
//       branch,
//       semester,
//       subject,
//       marks: {
//         enrolment,
//         name,
//         marks: Number(marks)
//       }
//     };

//     try {
//       const response = await axios.post('http://localhost:8000/api/v1/auth/marks', markingData);
//       console.log('Marking data saved:', response.data);


//     } catch (error) {
//       console.error('Error saving marking data:', error);
//     }
//   };

//   return (
//     <div className="mt-10 p-6 bg-white shadow-md rounded-md">
//       <h2 className="text-2xl font-bold mb-6 text-center placeholder-gray-700 text-gray-900">Put Marking</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-6">
//           <label
//             htmlFor="branch"
//             className="block text-lg font-medium text-gray-700 mb-2 placeholder-gray-700 text-gray-900"
//           >
//             Branch
//           </label>
//           <select
//             id="branch"
//             name="branch"
//             value={branch}
//             onChange={(e) => setBranch(e.target.value)}
//             className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-700 text-gray-900"
//             required
//           >
//             <option value="">Select Branch</option>
//             <option value="CE">CE</option>
//             <option value="IT">IT</option>
//             <option value="ME">ME</option>
//             <option value="CL">CL</option>
//           </select>
//         </div>
//         <div className="mb-6">
//           <label
//             htmlFor="semester"
//             className="block text-lg font-medium text-gray-700 mb-2 placeholder-gray-700 text-gray-900"
//           >
//             Semester
//           </label>
//           <select
//             id="semester"
//             name="semester"
//             value={semester}
//             onChange={(e) => setSemester(e.target.value)}
//             className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-700 text-gray-900"
//             required
//           >
//             <option value="">Select Semester</option>
//             <option value="1">1</option>
//             <option value="2">2</option>
//             <option value="3">3</option>
//             <option value="4">4</option>
//             <option value="5">5</option>
//             <option value="6">6</option>
//             <option value="7">7</option>
//             <option value="8">8</option>
//           </select>
//         </div>
//         <div className="mb-6">
//           <label
//             htmlFor="subject"
//             className="block text-lg font-medium text-gray-700 mb-2 placeholder-gray-700 text-gray-900"
//           >
//             Subject
//           </label>
//           <input
//             type="text"
//             id="subject"
//             name="subject"
//             value={subject}
//             onChange={(e) => setSubject(e.target.value)}
//             placeholder="Enter your Subject Name"
//             required
//             className="w-full p-3 border border-gray-300 rounded-lg placeholder-gray-700 text-gray-900"
//           />
//         </div>
        // <div className="mb-6">
        //   <label
        //     htmlFor="enrolment"
        //     className="block text-lg font-medium text-gray-700 mb-2 placeholder-gray-700 text-gray-900"
        //   >
        //     Enrolment Number
        //   </label>
        //   <input
        //     type="number"
        //     id="enrolment"
        //     name="enrolment"
        //     value={enrolment}
        //     onChange={(e) => setEnrolment(e.target.value)}
        //     placeholder="Enter Enrolment Number"
        //     required
        //     className="w-full p-3 border border-gray-300 rounded-lg placeholder-gray-700 text-gray-900"
        //   />
        // </div>
        // <div className="mb-6">
        //   <label
        //     htmlFor="name"
        //     className="block text-lg font-medium text-gray-700 mb-2 placeholder-gray-700 text-gray-900"
        //   >
        //     Student Name
        //   </label>
        //   <input
        //     type="text"
        //     id="name"
        //     name="name"
        //     value={name}
        //     onChange={(e) => setName(e.target.value)}
        //     placeholder="Enter Student Name"
        //     required
        //     className="w-full p-3 border border-gray-300 rounded-lg placeholder-gray-700 text-gray-900"
        //   />
        // </div>
        // <div className="mb-6">
        //   <label
        //     htmlFor="marks"
        //     className="block text-lg font-medium text-gray-700 mb-2 placeholder-gray-700 text-gray-900"
        //   >
        //     Marks
        //   </label>
        //   <input
        //     type="number"
        //     id="marks"
        //     name="marks"
        //     value={marks}
        //     onChange={(e) => setMarks(e.target.value)}
        //     placeholder="Enter Marks"
        //     required
        //     className="w-full p-3 border border-gray-300 rounded-lg placeholder-gray-700 text-gray-900"
        //   />
        // </div>
//         <button
//           type="submit"
//           className="w-full bg-[#000000] text-white p-3 rounded-lg hover:bg-[#1a1a1a] transition duration-300"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default MarkingForm;



import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

const MarkingForm = () => {
    const [branch, setBranch] = useState('');
    const [semester, setSemester] = useState('');
    const [subject, setSubject] = useState('');
    const [file, setFile] = useState(null); // Initialize file as null
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const toastOptions = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!branch || !semester || !subject || !file) {
            setError('All fields are required');
            toast.error("All fields are required", toastOptions);
            return;
        }

        const formData = new FormData();
        formData.append('branch', branch);
        formData.append('semester', semester);
        formData.append('subject', subject);
        formData.append('file', file);

        const token = localStorage.getItem('token');
        if (!token) {
            toast.error("Unauthorized: No token found", toastOptions);
            return;
        }

        try {
            const response = await axios.post('https://midsem-mern.onrender.com/api/v1/faculty/import-marks', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                toast.success("Marks imported successfully", toastOptions);
                navigate("/"); // Redirect to home page
            } else {
                toast.error("Failed to import marks", toastOptions);
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            toast.error("Error uploading file", toastOptions);
        }
    };

    return (
        <div className="mt-10 p-6 bg-white shadow-md rounded-md">
            <ToastContainer />
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 font-dosis">Put Marking</h2>
            <form onSubmit={handleSubmit}>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="mb-6">
                    <label htmlFor="branch" className="block text-lg font-medium text-gray-700 mb-2 font-dosis">Branch</label>
                    <select
                        id="branch"
                        value={branch}
                        onChange={(e) => setBranch(e.target.value)}
                        className="w-full p-3 border-2 border-gray-300 rounded-lg text-gray-900 font-dosis"
                    >
                        <option value="">Select Branch</option>
                        <option value="CE">CE</option>
                        <option value="IT">IT</option>
                        <option value="ME">ME</option>
                        <option value="CL">CL</option>
                    </select>
                </div>

                <div className="mb-6">
                    <label htmlFor="semester" className="block text-lg font-medium text-gray-700 mb-2 font-dosis">Semester</label>
                    <select
                        id="semester"
                        value={semester}
                        onChange={(e) => setSemester(e.target.value)}
                        className="w-full p-3 border-2 border-gray-300 rounded-lg text-gray-900 font-dosis"
                    >
                        <option value="">Select Semester</option>
                        {[...Array(8).keys()].map(i => (
                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-6">
                    <label htmlFor="subject" className="block text-lg font-medium text-gray-700 mb-2 font-dosis">Subject</label>
                    <input
                        type="text"
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full p-3 border-2 border-gray-300 rounded-lg text-gray-900 font-dosis"
                        placeholder="Enter subject"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="file" className="block text-lg font-medium text-gray-700 mb-2 font-dosis">Upload Marks (CSV)</label>
                    <input
                        type="file"
                        id="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="w-full p-3 border-2 border-gray-300 rounded-lg text-gray-900 font-dosis"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-dosis"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default MarkingForm;