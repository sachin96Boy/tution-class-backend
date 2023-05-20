import { body } from 'express-validator';

const SignInmiddleware = () => {
    return [
        body('email').trim().not().isEmpty().withMessage('This field is equired').isEmail().withMessage('Please enter valid email address'),
        body('password').isLength({ min: 5 })
    ]
}

export default  SignInmiddleware;