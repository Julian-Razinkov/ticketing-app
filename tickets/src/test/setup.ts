import {MongoMemoryServer} from "mongodb-memory-server";
import mongoose from "mongoose";
import {app} from "../app";
import request from 'supertest';
import jwt from 'jsonwebtoken'

let mongo:any;
beforeAll(async () => {
    process.env.JWT_KEY = 'hey';

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
    // faking the signin in
    const payload = {
        email: 'hello@test.com',
        password: 'password'
    }


    // generate jwt token const token = jwt.sign(payload, process.env.JWT)

    // make a express session object const session = 

    //encode it in base64 

    //return cookie

}