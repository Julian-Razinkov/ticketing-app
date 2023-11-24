import mongoose from "mongoose";
import { app } from "./app";
import { nastWrapper } from "./nats-wrapper";

const start = async () => {

  const PORT = 3001;
  const mongooseURI = 'mongodb://tickets-mongo-srv:27017/tickets';
  const natsClusterId = 'ticketing';
  const natsClientId = 'mustberandomstring';
  const natsUrl = 'http://nats-srv:4222'

  if(!process.env.jwt)
    throw new Error("JWT secret must be defined");

  try {
    await nastWrapper.connect(natsClusterId, natsClientId, natsUrl)
    //Graceful shutdown iplementation
    nastWrapper.client.on('close', () => {
      console.log('Nats connection is closed');
      process.exit();
    });
    process.on('SIGINT', () => nastWrapper.client.close());
    process.on('SIGTERM', () => nastWrapper.client.close());

    await mongoose.connect(mongooseURI);
  } catch (error) {
    console.error(error);
  };


  app.listen(PORT, () => {
    console.log("Listening on port 3000!  ");
  });

}

start();
