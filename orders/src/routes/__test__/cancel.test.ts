import request from 'supertest';
import {app} from '../../app';
import { Ticket } from '../../models/ticket';
import { OrderStatus } from '../../../../common/src/events/types/order-status';
import { Order } from '../../models/order';

it('cancels the order', async () => {
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


    await request(app)
        .patch(`/api/orders/${order.id}`)
        .set('Cookie', userCookie)
        .expect(200)

    const cancelledOrder = await Order.findById(order.id)

    expect(cancelledOrder?.status).toEqual(OrderStatus.Cancelled)
})