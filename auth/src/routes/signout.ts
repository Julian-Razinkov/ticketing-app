import {Router} from "express";

const router = Router();

router.get('/api/users/signout', (req, res) => {
    res.send("Sign Out");
});

export {router as signoutRouter};