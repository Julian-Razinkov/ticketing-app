import { app } from "../../app";
import request from 'supertest';

it('response has details about current user', async () => {
 
    const cookie = await signin()

    const response = await request(app)
        .get('/api/users/currentuser')
        .set('Cookie', cookie)
        .send()
        .expect(200);

    expect(response.body.currentUser.email).toEqual('test@test.com');
});

it('current user equals null for not authorized request', async () => {
    const cookie = await signin();

    const response = await request(app)
        .get('/api/users/currentuser')
        .set('Cookie', cookie)
        .send()
        .expect(200);
    
    expect(response.body.currentUser).toEqual(null)

})