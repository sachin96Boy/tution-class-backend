import {
    Request,
    Response,
    NextFunction
} from 'express';
import dotenv from 'dotenv';
import twilio from 'twilio';

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

const messageService = client.verify.v2.services.create(
    {
        friendlyName: 'Sipsa Institute Verification Service',
    }
).then((service)=>{
    console.log(service.sid);
    return service.sid;

})


const sendVerificationTokenSms = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { phoneNumber } = req.body;
        client.verify.v2.services(
            await messageService
        ).verifications.create({
            to: `+${phoneNumber}`,
            channel: 'sms'
        }).then((verfication)=>{
            console.log(verfication);
            res.status(200).json({
                status: verfication.status,
                message: 'Verification Token Sent'
            })
        })
    } catch (error) {
        next(error);
    }
}

const checkVerificationToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { phoneNumber, token } = req.body;
        client.verify.v2.services(
            await messageService
        ).verificationChecks.create({
            to: `+${phoneNumber}`,
            code: token
        }).then((verification_check)=>{
            console.log(verification_check);
            res.status(200).json({
                status: verification_check.status,
                valid: verification_check.valid,
                message: 'Verification Token Checked'
            })
        })
    } catch (error) {
        next(error);
    }
}

export {
    sendVerificationTokenSms,
    checkVerificationToken
}
