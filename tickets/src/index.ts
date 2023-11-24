import mongoose from "mongoose";
import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";

const start = async () => {

  const PORT = 3001;
  const mongooseURI = 'mongodb://tickets-mongo-srv:27017/tickets';
  const natsClusterId = 'ticketing';
  const natsClientId = 'mustberandomstring';
  const natsUrl = 'http://nats-srv:4222'

  if(!process.env.jwt) throw new Error("JWT secret must be defined");
  if(!process.env.NATS_CLIENT_ID) throw new Error("nats client id must be defined");
  if(!process.env.NATS_URL) throw new Error("nats url must be defined");
  if(!process.env.NATS_CLUSTER_ID) throw new Error("nats cluster id must be defined");

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID, 
      process.env.NATS_CLIENT_ID, 
      process.env.NATS_URL
    )
    //Graceful shutdown iplementation
    natsWrapper.client.on('close', () => {
      console.log('Nats connection is closed');
      process.exit();
    });
    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

    await mongoose.connect(mongooseURI);
  } catch (error) {
    console.error(error);
  };


  app.listen(PORT, () => {
    console.log("Listening on port 3000!  ");
  });

}

start();
