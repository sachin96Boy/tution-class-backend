import express from 'express';

import { sendVerificationTokenSms, checkVerificationToken, registerUser, loginUser, userVerification, } from '../controller/authentication.controller';

import SignInmiddleware from '../middleware/signInmiddleware';
import SignUpmiddleware from '../middleware/signUpmiddleware';


const router = express.Router();

router.post('/send-verification-token', sendVerificationTokenSms);
router.post('/check-verification-token', checkVerificationToken);
router.get('/verifyUser', userVerification);
router.post('/register', SignUpmiddleware(), registerUser);
router.post('/login', SignInmiddleware(), loginUser);


export default router;