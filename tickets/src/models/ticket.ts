import mongoose from "mongoose";

interface TicketAttrs{
    title:string;
    price:number;
    userId: string;
}

//to let ts know that document after saving can have additional fields that mongoose created
interface TicketDocument extends mongoose.Document{
    title: string;
    price: number;
    userId: string;
}

interface TicketModel extends mongoose.Model<TicketDocument>{
    build(attrs: TicketAttrs):TicketDocument
}

const ticketSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    price:{
        type:Number,
        required: true
    },
    userId:{
        type:String,    
        required: true,
    }
}, {
    toJSON:{
        transform(doc, ret){
            ret.id = ret._id
            delete ret._id
        }
    }
})

ticketSchema.statics.build = (attrs: TicketAttrs) => {
    return new Ticket(attrs)
};

const Ticket = mongoose.model<TicketDocument, TicketModel>('Ticket', ticketSchema)

export {Ticket}