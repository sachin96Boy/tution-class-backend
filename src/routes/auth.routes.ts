import express from 'express';

import { sendVerificationTokenSms, checkVerificationToken } from '../controller/authentication.controller';

const router = express.Router();

router.post('/send-verification-token', sendVerificationTokenSms);
router.post('/check-verification-token', checkVerificationToken);

export default router;