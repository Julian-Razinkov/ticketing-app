import {Router, Request, Response} from "express";
import {body, validationResult} from "express-validator";

const router = Router();

router.post('/api/users/signup',
    body('email').isEmail().withMessage("Invalid Email!"),
    body('password').trim().isLength({min: 4, max: 20}).withMessage("Invalid password"),

    (req:Request, res:Response) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) 
        throw new Error('Password or Email is invalid');
    
    console.log("Creating a new user!");

    throw new Error('DB is down!');

    res.send({});
    
});

export {router as signupRouter};