import express, {Request, Response} from 'express';

const router = express.Router()

router.post('/api/tickets', (req:Request, res:Response) =>{
    res.status(202).send();
});

export {router as createTicketRouter}