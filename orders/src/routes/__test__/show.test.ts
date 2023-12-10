import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';

it('returns the order', async () =>{
    // create ticket
    const ticket = Ticket.build({
        title: 'Concert',
        price: 10
    });

    await ticket.save();

    const userCookie = global.signin()

    //create order
    const {body: order} = await request(app)
        .post('/api/orders')
        .set('Cookie', userCookie)
        .send({
            ticketId: ticket.id
        })
        .expect(201)

    //get the order
    await request(app)
        .get(`/api/orders/${order.id}`)
        .set('Cookie', userCookie)
        .expect(200)

})