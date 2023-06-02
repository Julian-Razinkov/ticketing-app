import express, {Request, Response} from 'express';
import { body } from 'express-validator';
import { validateRequest } from '@razinkovtick/common';
import { User } from '../models/user';
import { BadRequestError } from '@razinkovtick/common';
import { Password } from '../services/password';
import jwt from 'jsonwebtoken'

const router = express.Router();

router.post('/api/users/signin', [
  body('email').isEmail().withMessage('email must be valid'),
  body('password').trim().notEmpty().withMessage('You must provide a password')
],
validateRequest,
async (req:Request, res:Response) => {
  const {email, password} = req.body;

  const existingUser = await User.findOne({email});
  if(!existingUser) throw new BadRequestError('Invalid email');

  const isPasswordsMatch = await Password.compare(existingUser.password, password )

  if(!isPasswordsMatch) throw new BadRequestError('Invalid password')

  const userJwt = jwt.sign({
    id: existingUser.id,
    email: existingUser.email
  }, process.env.JWT_KEY!
  );

  req.session = {
    jwt: userJwt
  };

  res.status(200).send(existingUser);

});

export { router as signinRouter };
