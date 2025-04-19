import express from 'express';
import { storeUserData } from '../controllers/userController.js';

const router = express.Router();

router.post('/store-user', storeUserData);

export default router;
