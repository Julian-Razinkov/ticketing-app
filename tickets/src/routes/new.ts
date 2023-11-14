import express, {Request, Response} from 'express';
import { requireAuth } from '@razinkovtick/common';

const router = express.Router()

router.post('/api/tickets', requireAuth, (req:Request, res:Response) =>{
    res.status(202).send();
});

export {router as createTicketRouter}