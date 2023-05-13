import { app } from "../../app";
import request from 'supertest';

it('clears the cookie after signin out', async () => {
    await request(app)
        .post('/api/users/singup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201)
    
    const response = await request(app)
        .post('/api/users/signout')
        .send({})
        .expect(200)
    
    expect(response.get('Set-Cookie')).toBeDefined();
})