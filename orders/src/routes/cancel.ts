import { Request, Response, Router } from 'express';
import { requireAuth } from '../../../common/src/middlewares/require-auth';
import { Order } from '../models/order';
import { NotFoundError } from '@razinkovtick/common';
import { OrderStatus } from '../../../common/src/events/types/order-status';

const router = Router()

router.patch('/api/orders/:orderId', requireAuth, async (req:Request, res:Response) => {
    const {id} = req.params;
    const order = await Order.findOne({
        id,
        userId: req.currentUser?.id
    });

    if(!order) throw new NotFoundError()

    order.status = OrderStatus.Cancelled;
    await order.save();

    res.status(200).send(order);
})

export {router as deleteOrdersRouter}
