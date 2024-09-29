import express from "express"
import { Router } from "express"
import {adminLogin,adminLogout, getStudentProfile, loginStudent, logoutFaculty, logoutStudent,registerStudent, teacherLogin, teacherSignup, updateStudent} from "../controller/authController.js"
import { isFacultyAuthenticated } from "../middleware/isFacultyAuthenicate.js";
import { verifyJWT } from "../middleware/authMiddleware.js";
import { isAdminAuthenticated} from "../middleware/isAdminAuth.js"
const router = Router();


//student auth routes
router.post('/signup', registerStudent)
router.post('/login',loginStudent)
router.get('/getmyprofile',verifyJWT,getStudentProfile);
router.post('/logout',verifyJWT,logoutStudent)
router.put('/update-student',verifyJWT,updateStudent)

//teacher auth routes
router.post('/teacher-signup',teacherSignup)
router.post('/teacher-login', teacherLogin)
router.post('/teacher-logout',isFacultyAuthenticated, logoutFaculty)
//admin auth routes
router.post('/admin-login',adminLogin)
router.post('/admin-logout',isAdminAuthenticated,adminLogout )
    

export default router