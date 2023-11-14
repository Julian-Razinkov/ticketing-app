import express, {Request, Response} from 'express'
import { Ticket } from '../models/ticket'
import { requireAuth, validateRequest, NotAuthorizedError, NotFoundError } from '@razinkovtick/common'
import { body } from 'express-validator'


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
        res.send({ticket})
})

export {router as updateTicketRouter}