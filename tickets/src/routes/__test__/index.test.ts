import request from 'supertest';
import { app } from '../../app';


const createTicket = async () => {
    return request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
        title: 'Hey',
        price: 10
    })
}

it('fatching a list of all existing tickets', async () => {

    //to create 3 separate tickets to test fetching
    await createTicket();
    await createTicket();
    await createTicket();
    
    const response = await request(app)
        .get('/api/tickets')
        .send()
        .expect(200)

    expect(response.body.lenght).toEqual(3);
});