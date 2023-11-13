import { Request, Response, Router} from 'express';
import { requireAuth } from '@razinkovtick/common';

const router = Router();

router.post('/api/tickets', requireAuth,  async (req:Request, res:Response) => {
    res.status(200).send();
});

export {router as createTicketRouter} 