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
})

it('return an error if invalid title is provided', async () => {
    
})


it('return an error if invalid price is provided', async () => {
    
})


it('creates a ticket if valid parameters provided', async () => {
    
})