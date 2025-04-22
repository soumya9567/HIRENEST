import express from 'express';
import { applyForJob, getUserData, getUserJobApplications, storeUserData, updateUserResume } from '../controllers/userController.js';
import upload from '../config/multer.js';

const router = express.Router();

router.post('/store-user', storeUserData);

router.get('/user',getUserData)


router.post('/apply',applyForJob)



router.get('/applications',getUserJobApplications)


router.post('/update-resume',upload.single('resume'),updateUserResume)

export default router;
