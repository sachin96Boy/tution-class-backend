import {
    Request,
    Response,
    NextFunction
} from 'express';
import dotenv from 'dotenv';
import twilio from 'twilio';
import firebase from '../firebase/firebase';
import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
    sendEmailVerification,
    updatePhoneNumber,
    signInWithEmailAndPassword
} from 'firebase/auth';
import UserModal from '../modals/UserModal';

dotenv.config();

const auth = getAuth(firebase.firebaseApp);

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

const messageService = client.verify.v2.services.create(
    {
        friendlyName: 'Sipsa Institute Verification Service',
    }
).then((service) => {
    console.log(service.sid);
    return service.sid;
});


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
        }).then((verfication) => {
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
        }).then((verification_check) => {
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

const registerUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { fullName, email, mobile, password } = req.body;
        await createUserWithEmailAndPassword(auth, email, password).then((createdUser) => {
            const user = createdUser.user;
            if (user) {
                updateProfile(user, {
                    displayName: fullName,
                }).then(() => {
                    updatePhoneNumber(user, mobile).then(() => {
                        sendEmailVerification(user).then(() => {
                            const newUser = {
                                uid: user.uid,
                                email: user.email,
                                displayName: user.displayName,
                                phoneNumber: user.phoneNumber,
                                emailVerified: user.emailVerified,
                                photoURL: user.photoURL,

                            }
                            UserModal.doc(user.uid).set(newUser)
                            res.status(200).json({
                                status: 'success',
                                message: 'User Registered',
                                user: newUser
                            })
                        })
                    })
                })
            }
        })
    } catch (error) {
        next(error);
    }
}

const loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, password } = req.body;
        await signInWithEmailAndPassword(auth, email, password).then((signedInUser) => {
            const user = signedInUser.user;
            if (user) {
                if (user.emailVerified) {
                    UserModal.doc(user.uid).get().then((userDoc) => {
                        const loggedInUser = {
                            uid: userDoc.id,
                            email: userDoc.data()?.email,
                            displayName: userDoc.data()?.displayName,
                            phoneNumber: userDoc.data()?.phoneNumber,
                            emailVerified: userDoc.data()?.emailVerified,
                            photoURL: userDoc.data()?.photoURL,
                        }
                        res.status(200).json({
                            status: 'success',
                            message: 'User Logged In',
                            user: loggedInUser
                        })
                    })
                } else {
                    res.status(200).json({
                        status: 'error',
                        message: 'Email Not Verified'
                    })
                }
            } else {
                res.status(200).json({
                    status: 'error',
                    message: 'User Not Found'
                })
            }
        })
    } catch (error) {
        next(error);
    }
}

export {
    sendVerificationTokenSms,
    checkVerificationToken,
    registerUser,
    loginUser
}
