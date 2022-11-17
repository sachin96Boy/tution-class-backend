import express from 'express';

import { sendVerificationTokenSms, checkVerificationToken, registerUser, loginUser, userVerification } from '../controller/authentication.controller';

const router = express.Router();

router.post('/send-verification-token', sendVerificationTokenSms);
router.post('/check-verification-token', checkVerificationToken);
router.get('/verifyUser', userVerification);
router.post('/register', registerUser);
router.post('/login', loginUser);


export default router;