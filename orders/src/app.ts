import express from "express";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { createOrdersRouter } from "./routes/new";
import { showOrdersRouter } from "./routes/show";
import { indexOrdersRouter } from "./routes";
//TODO fix the imports (deploy the common module to a npm and acces it from there )
import { currentUser } from "../../common/src/middlewares/current-user";
import { deleteOrdersRouter } from "./routes/cancel";


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
app.use(createOrdersRouter);
app.use(showOrdersRouter);
app.use(indexOrdersRouter);
app.use(deleteOrdersRouter);
export { app };