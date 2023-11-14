import request from 'supertest'
import { app } from '../../app'

it('if there is not ticket return 404', async () => {
    await request(app)
        .get('/api/tickets/gabagaba')
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