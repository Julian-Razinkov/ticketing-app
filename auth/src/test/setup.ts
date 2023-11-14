import {MongoMemoryServer} from "mongodb-memory-server";
import mongoose from "mongoose";
import {app} from "../app";
import request from 'supertest';

let mongo:any;
beforeAll(async () => {
    process.env.jwt = 'asdf';

    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for(let collection of collections){
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongoose.connection.close(); 
    await mongo.stop(); 
});

declare global {
    var signin: () => Promise<string[]>;
}

global.signin = async () => {
    const email = 'test@test.com';
    const password = 'password';

    const response = await request(app)
        .post('/api/users/singin')
        .send({
            email,
            password
        })
        .expect(200)

    const cookie = response.get('Set-Cookie');
    return cookie;
}