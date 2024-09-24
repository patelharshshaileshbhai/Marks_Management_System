import express from 'express';
import { importMarks } from '../controller/faculty.js';
import upload from '../middleware/multer.js'
import { isFacultyAuthenticated } from '../middleware/isFacultyAuthenicate.js';
import { logoutFaculty } from '../controller/authController.js';
// import { logoutTeacher } from '../controller/authController.js';

const router = express.Router();

router.post('/import-marks',isFacultyAuthenticated, upload.single('file'), importMarks);

router.post('/logout', isFacultyAuthenticated, logoutFaculty)

export default router;
