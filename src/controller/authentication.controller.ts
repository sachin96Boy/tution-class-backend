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
    signInWithEmailAndPassword,

} from 'firebase/auth';
import UserCollection from '../collections/UserCollection';

dotenv.config();

const auth = getAuth(firebase.firebaseApp);


const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

// NEED TO RUN ONCE TO OBAIN THE TWILIO MESSAGE SERVICE SID
// const messageService = client.verify.v2.services.create(
//     {
//         friendlyName: 'Sipsa Institute',
//     }
// ).then((service) => {
//     console.log(service.sid);
//     return service.sid;
// });


const sendVerificationTokenSms = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { phoneNumber } = req.body;
       await client.verify.v2.services(
            process.env.TWILIO_MESSAGE_SERVICE_SID!
        ).verifications.create({
            to: `+94${phoneNumber}`,
            channel: 'sms'
        }).then((verfication) => {
            console.log(verfication);
            res.status(200).json({
                status: verfication.status,
                message: 'Verification Token Sent'
            })
        })
    } catch (error) {
        console.log(error);
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
       await client.verify.v2.services(
            process.env.TWILIO_MESSAGE_SERVICE_SID!
        ).verificationChecks.create({
            to: `+94${phoneNumber}`,
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
        const { values } = req.body;
        await firebase.firebaseAdmin.auth().createUser({
            email: values.email,
            emailVerified: false,
            phoneNumber: `+94${values.mobile}`,
            password: values.password,
            displayName: values.fullName,
            disabled: false
        }).then((userRecord) => {
            const createdUser = {
                uid: userRecord.uid,
                email: userRecord.email,
                displayName: userRecord.displayName,
                phoneNumber: userRecord.phoneNumber,
                emailVerified: userRecord.emailVerified,

            }
            UserCollection.doc(userRecord.uid).set(createdUser).then(() => {
                res.status(200).json({
                    status: 'success',
                    message: 'User Registered',
                    user: createdUser
                })
            })
            
        }).catch((error) => {
            console.log(error);
            res.status(200).json({
                status: 'error',
                message: 'User Already Exists'
            })
        });
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
                    UserCollection.doc(user.uid).get().then((userDoc) => {
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
        }).catch((error) => {
            console.log(error);
            res.status(200).json({
                status: 'error',
                message: 'Invalid Email or Password'
            })
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
