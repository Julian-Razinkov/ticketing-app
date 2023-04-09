import {Router} from "express";

const router = Router();

router.get('/api/users/currentuser', (req, res) => {
    res.send("Hey bro, doing great, keep going")
});

export {router as currentUserRouter};