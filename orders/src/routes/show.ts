import {Request, Response, Router, response} from 'express'
import { Order } from '../models/order';
import { NotFoundError } from '@razinkovtick/common';
import { requireAuth } from '../../../common/src/middlewares/require-auth';

const router = Router()

router.get('/api/orders/:orderId', requireAuth, async (req:Request, res:Response) => {
    const {id} = req.params;
    const order = await Order.findOne({
        id,
        userId: req.currentUser?.id
    }).populate('ticket')

    if(!order) throw new NotFoundError()

    response.send(order)
})

export {router as showOrdersRouter}
