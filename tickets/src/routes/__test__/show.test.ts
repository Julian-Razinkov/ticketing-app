import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('if there is not ticket return 404', async () => {
    //generating a valid id so mongoose doesnt trows an error that cannot be handled in my error handler
    const id = new mongoose.Types.ObjectId().toHexString()

    await request(app)
        .get(`/api/tickets/${id}`)
        .send()
        .expect(404)
})

it('returns a ticket if ticket is found', async () => {
    const title = 'Hey';
    const price = 10;

    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title,
            price
        })
        .expect(201)
    
    
    await request(app)
        .get(`/api/tickets/${response.body.id}`)
        .set('Cookie', global.signin())
        .send()
        .expect(200);

    expect(response.body.title).toEqual(title)
    expect(response.body.price).toEqual(price);
})