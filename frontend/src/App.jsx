import React from 'react';
import {  Route, Routes } from 'react-router-dom';
import HomePage from './components/homepage/HomePage';
import StudentForm from './components/form/StudentForm';
import FacultyAdminForm from './components/FacultyAdminForm/FacultyAdminForm';
import Dashboard from './components/Dashboard/Dashboard';
import PrivateRoute from './components/privateroute/PrivateRoute';
import FacultyDashboard from './components/FacultyDashboard/FacultyDashboard';
import FacultyLoginForm from './components/FacultyLoginForm/FacultyLoginForm';
import MarksDashboard from './components/MarksDashboard/MarksDashboard';
import { AdminAuthProvider, AuthProvider, FacultyAuthProvider } from './components/context/AuthProvider';
import NotFound from './components/notFound/NotFound';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import TalkWithAIFaculty from './components/TalkWithAIFaculty/TalkWithAIFaculty';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import TalkWithAIStudent from './components/TalkWithAIStudent/TalkWithAIStudent';







function App() {
  return (
   <>
        <AuthProvider>
          <FacultyAuthProvider>
            <AdminAuthProvider>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/About' element={<About/>}/>
          <Route path='/Contact' element={<Contact/>}/>
          <Route path='/StudentForm' element={<StudentForm/>}/>
          <Route path='/FacultyAdminForm' element={<FacultyAdminForm/>}/>
          <Route path='/FacultyLoginForm' element={<FacultyLoginForm/>}/>
          <Route path='/Dashboard' element={<PrivateRoute role="student"><Dashboard /></PrivateRoute>}/>
          <Route path='/FacultyDashboard' element={<PrivateRoute role="faculty"><FacultyDashboard /></PrivateRoute>}/>
          <Route path='/MarksDashboard' element={<MarksDashboard/>}/>
          <Route path='/TalkWithAIFaculty' element={<TalkWithAIFaculty/>}/>
          <Route path='/TalkWithAIStudent' element={<TalkWithAIStudent/>}/>
          <Route path='/AdminDashboard' element={<PrivateRoute role="admin"><AdminDashboard /></PrivateRoute>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
        </AdminAuthProvider>
        </FacultyAuthProvider>
        </AuthProvider>
      
      </>
  );
}

export default App;
