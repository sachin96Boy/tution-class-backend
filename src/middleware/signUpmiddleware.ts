import { body } from 'express-validator';


const SignUpmiddleware = () => {
    return [
        body('values.email').trim().not().isEmpty().withMessage('This field is equired').isEmail().withMessage('Please enter valid email address'),
        body('values.password').isLength({ min: 5 }),
        body('values.mobile').trim().isInt().withMessage("Enter valid phone").isLength({
            min:9,
            max:10
        }).withMessage("Phone number can't be less than 9 and more than 10"),
        body("values.fullName")
    ]
}

export default SignUpmiddleware;