import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';


it('returns a 404 if provided id doesnt exist', async () => {
    const id = new mongoose.Types.ObjectId().toHexString()

    await request(app)
        .put(`/api/tickets/${id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'hey',
            price: 10
        })
        .expect(404)
})

it('reutrns a 401 if a user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString()

    await request(app)
        .put(`/api/tickets/${id}`)
        .send({
            title: 'hey',
            price: 10
        })
        .expect(401)
})

it('returns a 401 if user is not an owner of a ticket', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'sup',
            price: 30
        })

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'new ticket',
            price: 10
        })
        .expect(401)
})

it('returns a 400 if invalid title or price is provided', async () => {
    const cookie = global.signin()
    const response = await request(app)
        .post('/api/tickets/')
        .set('Cookie', cookie)
        .send({
            title: 'sup',
            price: 30
        })
    
    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: '',
            price: 20
        })
        .expect(400)

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'hello',
            price: -10
        })
        .expect(400)
    
})

it('updates a ticket if valid tickets are provided', async () => {
    const cookie = global.signin()
    const response = await request(app)
        .post('/api/tickets/')
        .set('Cookie', cookie)
        .send({
            title: 'sup',
            price: 30
        })
    
    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'Hello',
            price: 20
        })
        .expect(200)
})