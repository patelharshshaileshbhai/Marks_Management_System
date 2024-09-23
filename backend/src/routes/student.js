import express from 'express';
import {  getMyMarks } from '../controller/student.js';
import {logoutStudent} from "../controller/authController.js"
import { verifyJWT } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/getmymarks/:enrolment',verifyJWT,getMyMarks );

// Route to log out the student
router.post('/logout', verifyJWT, logoutStudent);

export default router;
