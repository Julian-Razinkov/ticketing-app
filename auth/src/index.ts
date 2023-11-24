import mongoose from "mongoose";
import { app } from "./app";

const start = async () => { 

  const PORT = 3000;
  const URI = 'mongodb://auth-mongo-srv:27017/auth'

  if(!process.env.jwt)
    throw new Error("JWT secret must be defined");

  try {
    await mongoose.connect(URI);
  } catch (error) {
    console.error(error);
  };

  app.get('/api', (req,res)=> {
    res.send("Hello there!");
  })
  
  app.listen(PORT, () => {
    console.log("Listening on port 3000!!!!!!!!");
  });

}

start();