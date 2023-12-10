import {Request, Response, Router} from 'express'
import { requireAuth } from '../../../common/src/middlewares/require-auth'
import { validateRequest } from '../../../common/src/middlewares/validate-request'
import {body} from 'express-validator'
import mongoose from 'mongoose'
import { Ticket } from '../models/ticket'
import { BadRequestError, NotFoundError } from '@razinkovtick/common'
import { isReservedJob } from '../jobs/reservation-check.job'
import { expiresAtJob } from '../jobs/expiary.job.ts'
import { Order } from '../models/order'
import { OrderStatus } from '../../../common/src/events/types/order-status'



const router = Router()


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

        const isTicketReserved = await isReservedJob(ticket)
        if(isTicketReserved) throw new BadRequestError('Ticket is already reserved')

        const expiresAt = expiresAtJob()

        const order = Order.build({
            userId: req.currentUser!.id,
            status: OrderStatus.Created,
            expiresAt,
            ticket
        })

        await order.save()

        //TODO: publish an event

        res.status(201).send(order);
    })

export {router as createOrdersRouter}
