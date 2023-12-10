import request  from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { Order } from "../../models/order";
import { Ticket } from "../../models/ticket";
import { OrderStatus } from "../../../../common/src/events/types/order-status";

it('returns an error if a ticket doesnt exist', async () => {
    const ticketId = new mongoose.Types.ObjectId();

    await request(app)
        .post('/api/orders')
        .set('Cookie', global.signin())
        .send({ticketId})
        .expect(404)
})

it('returns an error if a ticket is already reserved', async () => {
    const ticket = Ticket.build({
        title: 'Some ticket',
        price: 20
    })
    await ticket.save();

    const order = Order.build({
        ticket,
        userId: 'someid',
        status: OrderStatus.Created,
        expiresAt: new Date()
    });

    await order.save();

    await request(app)
        .post('/api/orders')
        .set('Cookie', global.signin())
        .send({ticketId: ticket.id})
        .expect(400);
})

it('reserves the tickets', async () =>{
    const ticket = Ticket.build({
        title: "Some ticket",
        price: 20
    })

    await ticket.save()

    await request(app)
        .post('/api/orders')
        .set('Cookie', global.signin())
        .send({ticketId: ticket.id})
        .expect(201)
})

//TODO
it.todo('Publishes an event when order created')