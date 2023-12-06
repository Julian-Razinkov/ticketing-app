import { Order } from "../models/order"
import { OrderStatus } from "../../../common/src/events/types/order-status"
import { TicketDoc } from "../models/ticket"


const isReservedJob = async function(ticketDoc:TicketDoc):Promise<boolean>{
    const order = await Order.findOne({
        ticket: ticketDoc,
        status: {
            $in: [
                OrderStatus.Complete,
                OrderStatus.AwaitingPayment,
                OrderStatus.Created
            ]
        }
    })

    //to convert order to boolean value
    return !!order 
}

export {isReservedJob}