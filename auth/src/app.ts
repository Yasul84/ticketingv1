import express from 'express';
import 'express-async-errors'; 
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/Signin';
import { signoutRouter } from './routes/Signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from '@tntickets/common';
import { NotFoundError } from '@tntickets/common'; 

const app = express();

app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== 'test'
    })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async (req, res, next) => {
    throw new NotFoundError(); 
});

app.use(errorHandler);

export { app };