import express from 'express';
import { getCurrentUser, updateUserInfo } from '../controllers/users.js';
import { validateUserInfo } from '../middlewares/reqValidation.js';

const router = express.Router();

router.get('/me', getCurrentUser);

router.patch('/me', validateUserInfo, updateUserInfo);

export default router;
