import request from 'supertest';
import {app} from '../../app';

it('has route handler listening to /api/tickets for post request', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .send({})

    expect(response.status).not.toEqual(404);
})

it('can only be accessed if user authenticated ', async () => {
    await request(app)
        .post('/api/tickets')
        .send({})
        .expect(401)
});

it('return the status other than 401 if a user is signed in',async () => {
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({})
expect(response.status).not.toEqual(401)
})

it('return an error if invalid title is provided', async () => {
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: '',
            price: 10,
        })
        .expect(400)
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            price: 10,
        })
        .expect(400)
})


it('return an error if invalid price is provided', async () => {
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'Ticket',
            price: -10,
        })
        .expect(400)

    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'this is titile',
        })
        .expect(400)
})


it('creates a ticket if valid parameters provided', async () => {
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'ticket',
            price: 10
        })
        .expect(201);

})