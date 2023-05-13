import { app } from "../../app";
import request from 'supertest';

it('return 400 with non-existing email', async () => {
    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'whatsup@gmail.com',
            password: 'password'
        })
        .expect(400)
});

it('return 400 with wrong password', async () => {

    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201)

    return request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: ';ldsainv'
        })
        .expect(400);
})

it('sets a cookie after sucessful login', async () => {
    
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password',
        })
        expect(201)

    const response = await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(200)

    expect(response.get('Set-Cookie')).toBeDefined();
})