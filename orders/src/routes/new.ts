import {Request, Response, Router} from 'express'
import { requireAuth } from '../../../common/src/middlewares/require-auth'
import { validateRequest } from '../../../common/src/middlewares/validate-request'
import {body} from 'express-validator'
import mongoose from 'mongoose'
import { Ticket } from '../models/ticket'
import { Order } from '../models/order'
import { BadRequestError, NotFoundError } from '@razinkovtick/common'
import { OrderStatus } from '../../../common/src/events/types/order-status'


const router = Router()
const newOrderService = new OrderService()

router.post('/api/orders',
    requireAuth, 
    [
        body('ticketId')
        .not()
        .isEmpty()
        .custom((input:string) => mongoose.Types.ObjectId.isValid(input))
        .withMessage('TicketId must be provided')
    ],
    validateRequest,
    async (req:Request, res:Response) => {
        //potentiall refactor
        //Add service, for each router, so that only thing router does
        //its data validation and request handling
        //And all logic is written in service (better architecture) 
        const {ticketId} = req.body

        const ticket = await Ticket.findById(ticketId);
        if(!ticket) throw new NotFoundError()

        //Make sure that our ticket is not reserved by other order
        const order = await Order.findOne({
            ticket: ticket,
            status: {
                $in: [
                    OrderStatus.Created,
                    OrderStatus.AwaitingPayment,
                    OrderStatus.Complete
                ]
            }
        });
        //TODO: extract the reservation check logic into separate file
        //TODO: write a service that is responsible for expiration (setExpiry date, checkExpiry date)

        if(order) throw new BadRequestError('Ticket is already reserved')

        res.send({})
    })

export {router as createOrdersRouter}
