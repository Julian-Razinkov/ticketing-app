import express, {Request, Response} from 'express'
import { Ticket } from '../models/ticket'
import { requireAuth } from '../../../common/src/middlewares/require-auth';
import { validateRequest } from '../../../common/src/middlewares/validate-request';
import { NotAuthorizedError } from '../../../common/src/errors/not-authorized-error';
import { NotFoundError } from '../../../common/src/errors/not-found-error';
import { body } from 'express-validator';
import { TicketUpdatedPublisher } from '../events/publishers/ticket-updated-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router()

router.put('/api/tickets/:id', 
    requireAuth,
    [
        body('title').notEmpty().withMessage('Title is required'),
        body('price').isFloat({gt: 0}).withMessage('Price must be greater than 0')
    ],
    validateRequest, 
    async (req:Request, res: Response) => {

        const id = req.params.id;
        const ticket = await Ticket.findById(id)

        //request validation
        if(!ticket) throw new NotFoundError()
        if(ticket.userId !== req.currentUser?.id) throw new NotAuthorizedError()

        ticket.set({
            title: req.body.title,
            price: req.body.price
        })

        
        await ticket.save()

        new TicketUpdatedPublisher(natsWrapper.client).publish({
            id: ticket.id,
            title: ticket.title,
            price: ticket.price,
            userId: ticket.userId
        })
        res.send({ticket})
})

export {router as updateTicketRouter}