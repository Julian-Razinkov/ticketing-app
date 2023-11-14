import express from "express";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { createTicketRouter } from "./routes/new";
import { showTicketRouter } from "./routes/show";
import { indexTicketRouter } from "./routes";
import { currentUser } from "@razinkovtick/common";


const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);

app.use(currentUser);
app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
export { app };