import {MongoMemoryServer} from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken'

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
    var signin: () => string[];
}

global.signin = () => {
    // build a payload
    const jwtPayload = {
        emai: 'test@test.com',
        password: 'password'
    }
    const jwtToken = jwt.sign(jwtPayload, process.env.jwt!)
    const session = {jwt: jwtToken}
    const sessionJSON = JSON.stringify(session)
    const base64 = Buffer.from(sessionJSON).toString('base64');
    return [`session=${base64}`];
}