import {Router} from "express";

const router = Router();

router.get('/api/users/signin', (req, res) => {
    res.send("Sign in");
});

export {router as signinRouter};