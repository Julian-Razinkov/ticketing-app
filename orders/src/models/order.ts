import mongoose from "mongoose";
import {OrderStatus} from '../../../common/src/events/types/order-status';
import { TicketDoc } from "./ticket";


interface OrderAttrs{
    userId:string;
    status:OrderStatus; 
    expiresAt: Date;
    ticket: TicketDoc;
}
interface OrderDoc extends mongoose.Document{
    userId:string;
    status:OrderStatus;
    expiresAt: Date;
    ticket: TicketDoc;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
    build(attrs: OrderAttrs):OrderDoc;
}

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        require: true,
    },
    status: {
        type: String,
        require: true,
        enum: Object.values(OrderStatus),
        default: OrderStatus.Created
    },
    expiresAt: {
        type: mongoose.Schema.Types.Date
    },
    ticket:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket'
    }
}, {
    /*
    Note: This is not the best practise when it comes to
    restricting the data that we will provide as a response for the request
    it's better to use DTO's in such cases
    */
    toJSON:{
        transform(doc, ret){
            ret.id = ret._id;
            delete ret._id;
        }
    }
})

orderSchema.statics.build = (attrs: OrderAttrs) => {
    return new Order(attrs);
}

const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema);

export {Order}