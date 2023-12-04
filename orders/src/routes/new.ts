import {Request, Response, Router} from 'express'
import { requireAuth } from '../../../common/src/middlewares/require-auth'
import { validateRequest } from '../../../common/src/middlewares/validate-request'
import {body} from 'express-validator'
import mongoose from 'mongoose'
import { Ticket } from '../models/ticket'
import { BadRequestError, NotFoundError } from '@razinkovtick/common'
import { isReserved } from '../jobs/reservation-check.job'



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

        const isTicketReserved = await isReserved(ticket)

        if(isTicketReserved) throw new BadRequestError('Ticket is already reserved')
        //TODO: write a service that is responsible for expiration (setExpiry date, checkExpiry date)


        res.send({})
    })

export {router as createOrdersRouter}
