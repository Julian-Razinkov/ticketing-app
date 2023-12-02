import {Request, Response, Router} from 'express'
import { requireAuth } from '../../../common/src/middlewares/require-auth'
import { validateRequest } from '../../../common/src/middlewares/validate-request'
import {body} from 'express-validator'
import mongoose from 'mongoose'

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
        res.send({})
    })

export {router as createOrdersRouter}
