import express from 'express';
import { isAdminAuthenticated } from '../middleware/isAdminAuth.js';
import {getAllFaculties, getAllStudentBySemesterAndBranch, getAllStudents, getDepartmentFaculties, getDepartmentStudents, getSemesterStudent, getStudentByEnrolment } from '../controller/admin.js';

const router = express.Router();

router.get('/get-students/:branch/:semester',isAdminAuthenticated, getAllStudentBySemesterAndBranch);
router.get('/getstudentbyenrolment/:enrollment',isAdminAuthenticated, getStudentByEnrolment);
router.get('/getAllStudents',isAdminAuthenticated, getAllStudents);
router.get('/get-branch-students/:branch',isAdminAuthenticated, getDepartmentStudents);
router.get('/get-semester-students/:semester',isAdminAuthenticated, getSemesterStudent);

router.get('/get-department-faculties/:department',isAdminAuthenticated,getDepartmentFaculties);
router.get('/getAllFaculties',isAdminAuthenticated,getAllFaculties);

export default router;
